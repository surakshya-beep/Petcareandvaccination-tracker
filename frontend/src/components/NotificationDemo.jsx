import React from 'react'
import { motion } from 'framer-motion'
import { Bell, CheckCircle, AlertCircle, AlertTriangle, Info, Calendar, MapPin, Phone } from 'lucide-react'

/**
 * Notification Demo Showcase
 * Display realistic appointment and vaccination reminders
 */
const NotificationDemo = () => {
  const today = new Date();
  const in2Days = new Date(today);
  in2Days.setDate(in2Days.getDate() + 2);

  const demoNotifications = [
    {
      id: 1,
      type: 'appointment_reminder',
      severity: 'warning',
      icon: '🏥',
      title: 'Vaccination appointment in 2 days',
      message: `Charlie has a vaccination appointment scheduled for ${in2Days.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 2:30 PM`,
      details: 'Rabies & DHPP vaccines will be administered',
      pet: 'Charlie',
      vetClinic: 'Happy Paws Veterinary Clinic',
      phone: '(555) 123-4567',
      time: '2:30 PM',
      vaccines: 'Rabies & DHPP'
    },
    {
      id: 2,
      type: 'appointment_reminder',
      severity: 'warning',
      icon: '🏥',
      title: 'Doctor appointment coming up',
      message: `Luna has a wellness checkup scheduled for ${in2Days.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at 3:45 PM`,
      details: 'Annual examination and bloodwork',
      pet: 'Luna',
      vetClinic: 'Pet Care Medical Center',
      phone: '(555) 789-0123',
      time: '3:45 PM',
      appointmentType: 'Annual Checkup'
    },
    {
      id: 3,
      type: 'vaccination_due',
      severity: 'warning',
      icon: '💉',
      title: 'Booster vaccination reminder in 3 days',
      message: 'Max needs Bordetella booster vaccination. This protects against kennel cough.',
      details: 'Schedule appointment now to secure your preferred time',
      pet: 'Max',
      vaccine: 'Bordetella Booster',
      daysUntil: 3
    },
    {
      id: 4,
      type: 'appointment_reminder',
      severity: 'info',
      icon: '🪥',
      title: 'Upcoming dental checkup',
      message: 'Buddy has a scheduled appointment for dental cleaning and oral health assessment',
      details: 'Early morning appointment available',
      pet: 'Buddy',
      vetClinic: 'Smile Dental Vet Care',
      time: '10:00 AM',
      daysUntil: 5
    },
    {
      id: 5,
      type: 'vaccination_due',
      severity: 'info',
      icon: '💉',
      title: 'Upcoming vaccination in 7 days',
      message: "Daisy's Lepto vaccine is coming up. Give your vet a call to book an appointment.",
      pet: 'Daisy',
      vaccine: 'Leptospirosis',
      daysUntil: 7
    },
    {
      id: 6,
      type: 'vaccination_completed',
      severity: 'info',
      icon: '✅',
      title: 'Vaccination completed successfully',
      message: "Rocky completed his Rabies booster vaccination yesterday",
      details: 'Next booster due in 1 year',
      pet: 'Rocky',
      vaccine: 'Rabies Booster'
    }
  ]

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-l-4 border-yellow-500',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        }
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-l-4 border-blue-500',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        }
      default:
        return {
          bg: 'bg-red-50',
          border: 'border-l-4 border-red-500',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        }
    }
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-600" />
          Real-world Notification Examples
        </h2>
        <p className="text-slate-600">See how you'll receive notifications for upcoming appointments and vaccinations</p>
      </motion.div>

      {/* Severity Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="font-bold text-yellow-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Immediate Action
          </div>
          <p className="text-sm text-yellow-700 mt-1">Appointments and vaccines due within 2-3 days</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="font-bold text-blue-800 flex items-center gap-2">
            <Info className="w-5 h-5" /> Upcoming Reminders
          </div>
          <p className="text-sm text-blue-700 mt-1">Appointments and vaccines 5+ days away or completed</p>
        </div>
      </motion.div>

      {/* Sample Notifications */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
        className="space-y-4"
      >
        {demoNotifications.map((notification, idx) => {
          const styles = getSeverityStyles(notification.severity)
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`${styles.bg} ${styles.border} p-5 rounded-lg shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-4xl flex-shrink-0">
                  {notification.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-lg">
                        {notification.title}
                      </h3>

                      {/* Main Message */}
                      <p className="text-sm text-slate-700 mt-2">
                        {notification.message}
                      </p>

                      {/* Details */}
                      {notification.details && (
                        <p className="text-sm text-slate-600 mt-2 italic">
                          {notification.details}
                        </p>
                      )}

                      {/* Appointment Details */}
                      <div className="mt-4 space-y-2">
                        {/* Pet Badge */}
                        <div className={`inline-flex items-center gap-2 ${styles.badge} text-xs font-semibold px-3 py-2 rounded-full`}>
                          🐾 {notification.pet}
                        </div>

                        {/* Vet Clinic Info */}
                        {notification.vetClinic && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 ml-3">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{notification.vetClinic}</span>
                          </div>
                        )}

                        {/* Appointment Time */}
                        {notification.time && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 ml-3">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{notification.time}</span>
                          </div>
                        )}

                        {/* Phone */}
                        {notification.phone && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 ml-3">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-blue-600 hover:underline cursor-pointer">{notification.phone}</span>
                          </div>
                        )}

                        {/* Vaccines/Services */}
                        {(notification.vaccines || notification.vaccine || notification.appointmentType) && (
                          <div className="mt-2 text-xs text-slate-700 bg-white/50 p-2 rounded">
                            📋 <strong>{notification.vaccines || notification.vaccine || notification.appointmentType}</strong>
                          </div>
                        )}
                      </div>

                      {/* Days Until */}
                      {notification.daysUntil && (
                        <div className="mt-3 inline-block bg-white px-3 py-1 rounded text-xs font-semibold text-slate-700">
                          ⏱️ {notification.daysUntil} days away
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6"
      >
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span> How This Works in Real Life
        </h3>
        <ul className="text-sm text-blue-900 space-y-2">
          <li><strong>✅ Day 1:</strong> Notification appears "Your pet has an appointment in 2 days"</li>
          <li><strong>✅ Day 2:</strong> Notification updates "Your appointment is tomorrow at 2:30 PM"</li>
          <li><strong>✅ Day 3:</strong> Appointment happens, notification marks as completed</li>
          <li><strong>✅ Automatic:</strong> System checks every night at 6 AM for upcoming appointments</li>
          <li><strong>✅ Smart:</strong> Notifications prioritize based on urgency (2 days = action needed!)</li>
          <li><strong>✅ Organized:</strong> View all at a glance or filter by type</li>
        </ul>
      </motion.div>

      {/* User Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-6"
      >
        <h3 className="font-bold text-slate-900 mb-3">🎬 Next Steps When You See These Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="flex gap-3">
            <span className="text-xl">1️⃣</span>
            <div>
              <strong>See notification</strong>
              <p className="text-xs mt-1">Bell icon shows "2 unread" notifications</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xl">2️⃣</span>
            <div>
              <strong>Click for details</strong>
              <p className="text-xs mt-1">See vet clinic, time, and vaccine info</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xl">3️⃣</span>
            <div>
              <strong>Call your vet</strong>
              <p className="text-xs mt-1">Phone number included in notification</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xl">4️⃣</span>
            <div>
              <strong>Mark as handled</strong>
              <p className="text-xs mt-1">Mark read to clear from unread count</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotificationDemo
