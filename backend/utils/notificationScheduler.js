/**
 * Vaccination Notification Scheduler
 * Runs periodically to check for upcoming vaccinations and create notifications
 */

const Notification = require('../models/Notification');
const Pet = require('../models/Pet');
const MedicalRecord = require('../models/MedicalRecord');
const { generateVaccinationNotification } = require('./notificationUtils');

/**
 * Check all pets for upcoming vaccinations and create notifications
 * This should be run via a cron job (e.g., daily)
 */
async function checkAndCreateVaccinationNotifications() {
  try {
    console.log('[Notification Scheduler] Starting vaccination notification check...');

    // Get all pets with their medical records
    const pets = await Pet.find().populate('ownerID');

    for (const pet of pets) {
      const medicalRecords = await MedicalRecord.find({ petID: pet._id });

      // Check each medical record for upcoming vaccinations
      for (const record of medicalRecords) {
        if (record.type === 'Vaccine' && record.nextDueDate) {
          // Check if notification already exists for this record
          const existingNotification = await Notification.findOne({
            medicalRecordId: record._id,
            userId: pet.ownerID._id,
            isDismissed: false
          });

          if (!existingNotification) {
            // Generate and create notification
            const notificationData = generateVaccinationNotification({
              userId: pet.ownerID._id,
              petId: pet._id,
              petName: pet.name,
              medicalRecord: record
            });

            const notification = new Notification(notificationData);
            await notification.save();

            console.log(`[Notification Scheduler] Created notification for ${pet.name} - ${record.description}`);
          }
        }
      }
    }

    console.log('[Notification Scheduler] Vaccination notification check completed');
  } catch (error) {
    console.error('[Notification Scheduler] Error:', error);
  }
}

/**
 * Mark overdue notifications as critical and send alerts
 */
async function updateOverdueNotifications() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find notifications for overdue vaccines
    const overdueNotifications = await Notification.find({
      type: 'vaccination_due',
      dueDate: { $lt: today },
      isDismissed: false
    });

    for (const notification of overdueNotifications) {
      if (notification.type !== 'vaccination_overdue') {
        notification.type = 'vaccination_overdue';
        notification.severity = 'critical';
        notification.title = `🚨 ${notification.vaccinationType} - OVERDUE`;
        notification.message = `Your pet's ${notification.vaccinationType} is now overdue! Please schedule an appointment immediately.`;
        await notification.save();
      }
    }

    console.log(`[Notification Scheduler] Updated ${overdueNotifications.length} overdue notifications`);
  } catch (error) {
    console.error('[Notification Scheduler] Error updating overdue notifications:', error);
  }
}

/**
 * Clean up old dismissed notifications
 */
async function cleanupOldNotifications() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const result = await Notification.deleteMany({
      isDismissed: true,
      dismissedAt: { $lt: thirtyDaysAgo }
    });

    console.log(`[Notification Scheduler] Cleaned up ${result.deletedCount} old dismissed notifications`);
  } catch (error) {
    console.error('[Notification Scheduler] Error cleaning up notifications:', error);
  }
}

/**
 * Initialize scheduler - run once on server startup
 */
function initializeScheduler() {
  console.log('[Notification Scheduler] Initializing...');

  // Run immediately on startup
  checkAndCreateVaccinationNotifications();
  updateOverdueNotifications();
  cleanupOldNotifications();

  // Schedule to run daily at 6 AM
  const schedule = require('node-schedule');
  
  // Check vaccinations daily
  schedule.scheduleJob('0 6 * * *', checkAndCreateVaccinationNotifications);
  
  // Update overdue notifications twice daily
  schedule.scheduleJob('0 6,18 * * *', updateOverdueNotifications);
  
  // Cleanup old notifications weekly
  schedule.scheduleJob('0 2 * * 0', cleanupOldNotifications);

  console.log('[Notification Scheduler] Scheduler initialized successfully');
}

module.exports = {
  checkAndCreateVaccinationNotifications,
  updateOverdueNotifications,
  cleanupOldNotifications,
  initializeScheduler
};
