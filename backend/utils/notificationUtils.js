/**
 * Notification Utilities for Vaccination Reminder System
 */

/**
 * Generate notification based on vaccine status
 * @param {Object} params - { userId, petId, petName, medicalRecord }
 * @returns {Object} - notification object ready to save
 */
function generateVaccinationNotification(params) {
    const { userId, petId, petName, medicalRecord } = params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextDue = new Date(medicalRecord.nextDueDate);
    nextDue.setHours(0, 0, 0, 0);

    const daysUntilDue = Math.floor((nextDue - today) / (1000 * 60 * 60 * 24));

    let notification = {
        userId,
        petId,
        medicalRecordId: medicalRecord._id,
        vaccinationType: medicalRecord.description,
        dueDate: medicalRecord.nextDueDate,
        daysUntilDue
    };

    // Determine notification type and severity
    if (daysUntilDue < 0) {
        // Overdue
        notification.type = 'vaccination_overdue';
        notification.severity = 'critical';
        notification.title = `🚨 ${medicalRecord.description} - OVERDUE`;
        notification.message = `${petName}'s ${medicalRecord.description} is ${Math.abs(daysUntilDue)} days overdue! Please schedule an appointment immediately.`;
    } else if (daysUntilDue === 0) {
        // Due today
        notification.type = 'vaccination_due';
        notification.severity = 'critical';
        notification.title = `⚡ ${medicalRecord.description} - Due Today`;
        notification.message = `${petName} needs ${medicalRecord.description} today! Contact your veterinarian to schedule.`;
    } else if (daysUntilDue <= 7) {
        // Due within a week
        notification.type = 'vaccination_due';
        notification.severity = 'warning';
        notification.title = `⏰ ${medicalRecord.description} - Due Soon`;
        notification.message = `${petName}'s ${medicalRecord.description} is due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}. Schedule now!`;
    } else if (daysUntilDue <= 14) {
        // Due within two weeks
        notification.type = 'vaccination_due';
        notification.severity = 'warning';
        notification.title = `📅 ${medicalRecord.description} - Coming Up`;
        notification.message = `Reminder: ${petName} needs ${medicalRecord.description} in ${daysUntilDue} days.`;
    } else {
        // Due but not urgent
        notification.type = 'appointment_reminder';
        notification.severity = 'info';
        notification.title = `💉 ${medicalRecord.description} - Upcoming`;
        notification.message = `${petName} has an upcoming ${medicalRecord.description} due on ${formatDate(medicalRecord.nextDueDate)}.`;
    }

    return notification;
}

/**
 * Get notification icon based on type
 * @param {String} type - notification type
 * @returns {String} - icon emoji
 */
function getNotificationIcon(type) {
    const icons = {
        'vaccination_due': '💉',
        'vaccination_overdue': '🚨',
        'appointment_reminder': '📅',
        'vaccination_completed': '✅',
        'health_alert': '⚠️'
    };
    return icons[type] || '🔔';
}

/**
 * Get notification color based on severity
 * @param {String} severity - 'critical', 'warning', 'info'
 * @returns {Object} - { bg, text, border, badge }
 */
function getNotificationColor(severity) {
    const colors = {
        'critical': {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            badge: 'bg-red-100 text-red-800',
            icon: 'text-red-600'
        },
        'warning': {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            badge: 'bg-yellow-100 text-yellow-800',
            icon: 'text-yellow-600'
        },
        'info': {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            badge: 'bg-blue-100 text-blue-800',
            icon: 'text-blue-600'
        }
    };
    return colors[severity] || colors['info'];
}

/**
 * Format date to readable string
 * @param {Date} date - date to format
 * @returns {String} - formatted date
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Calculate notification priority
 * @param {Object} notification - notification object
 * @returns {Number} - priority score (higher = more important)
 */
function calculateNotificationPriority(notification) {
    let priority = 0;

    // Severity scoring
    if (notification.severity === 'critical') priority += 100;
    else if (notification.severity === 'warning') priority += 50;
    else priority += 10;

    // Recency scoring
    const ageInHours = (Date.now() - new Date(notification.createdAt)) / (1000 * 60 * 60);
    priority += Math.max(0, 50 - ageInHours); // Newer is better

    // Unread notifications get priority
    if (!notification.isRead) priority += 25;

    return priority;
}

/**
 * Group notifications by status
 * @param {Array} notifications - array of notification objects
 * @returns {Object} - grouped notifications
 */
function groupNotifications(notifications) {
    return {
        unread: notifications.filter(n => !n.isRead),
        actionNeeded: notifications.filter(n => n.severity === 'critical' && !n.isDismissed),
        upcoming: notifications.filter(n => n.type === 'appointment_reminder'),
        completed: notifications.filter(n => n.type === 'vaccination_completed'),
        dismissed: notifications.filter(n => n.isDismissed)
    };
}

module.exports = {
    generateVaccinationNotification,
    getNotificationIcon,
    getNotificationColor,
    formatDate,
    calculateNotificationPriority,
    groupNotifications
};
