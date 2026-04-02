import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Syringe, Calendar, AlertCircle, CheckCircle, X, Clock } from 'lucide-react'

const HealthReminders = ({ reminders = [] }) => {
  const [dismissedReminders, setDismissedReminders] = useState([])

  // Default reminders if none provided
  const defaultReminders = [
    {
      id: 1,
      petName: 'Charlie',
      type: 'vaccination',
      title: 'Rabies Vaccination Due',
      description: 'Charlie needs a Rabies vaccination in 2 days',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '💉'
    },
    {
      id: 2,
      petName: 'Luna',
      type: 'checkup',
      title: 'Annual Checkup Reminder',
      description: 'Luna is due for her annual wellness checkup',
      priority: 'medium',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '👨‍⚕️'
    },
    {
      id: 3,
      petName: 'Max',
      type: 'dental',
      title: 'Dental Cleaning Overdue',
      description: 'Max\'s dental cleaning is overdue. Schedule an appointment.',
      priority: 'high',
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '🦷'
    },
    {
      id: 4,
      petName: 'Charlie',
      type: 'medication',
      title: 'Medication Refill Needed',
      description: 'Charlie\'s medication will run out in 5 days',
      priority: 'medium',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '💊'
    },
    {
      id: 5,
      petName: 'Buddy',
      type: 'weight',
      title: 'Weight Check',
      description: 'Buddy needs a weight check. It\'s been 3 months.',
      priority: 'low',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '⚖️'
    },
    {
      id: 6,
      petName: 'Luna',
      type: 'vaccination',
      title: 'DHPP Booster Due',
      description: 'Luna\'s DHPP booster vaccination is due',
      priority: 'high',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      icon: '💉'
    }
  ]

  const displayReminders = reminders.length > 0 ? reminders : defaultReminders
  const activeReminders = displayReminders.filter(r => !dismissedReminders.includes(r.id))

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-yellow-50 border-yellow-200'
      case 'low': return 'bg-blue-50 border-blue-200'
      default: return 'bg-slate-50 border-slate-200'
    }
  }

  const getPriorityBadgeColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'medium': return <Clock className="w-5 h-5 text-yellow-600" />
      case 'low': return <CheckCircle className="w-5 h-5 text-blue-600" />
      default: return <Bell className="w-5 h-5 text-slate-600" />
    }
  }

  const dismissReminder = (id) => {
    setDismissedReminders([...dismissedReminders, id])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-red-700 font-semibold">HIGH PRIORITY</span>
          </div>
          <p className="text-3xl font-bold text-red-900">
            {activeReminders.filter(r => r.priority === 'high').length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700 font-semibold">MEDIUM</span>
          </div>
          <p className="text-3xl font-bold text-yellow-900">
            {activeReminders.filter(r => r.priority === 'medium').length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-700 font-semibold">LOW PRIORITY</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">
            {activeReminders.filter(r => r.priority === 'low').length}
          </p>
        </motion.div>
      </div>

      {/* Reminders List */}
      {activeReminders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
        >
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-green-900">All Caught Up! 🎉</p>
          <p className="text-green-700">No health reminders at this time</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {activeReminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              variants={itemVariants}
              className={`card border-2 p-4 ${getPriorityColor(reminder.priority)} hover:shadow-lg transition`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0">{reminder.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{reminder.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${getPriorityBadgeColor(reminder.priority)}`}>
                          {reminder.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{reminder.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span className="font-semibold">Pet: {reminder.petName}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {reminder.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dismiss Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dismissReminder(reminder.id)}
                  className="p-2 hover:bg-black hover:bg-opacity-10 rounded-lg transition flex-shrink-0"
                  title="Dismiss reminder"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default HealthReminders
