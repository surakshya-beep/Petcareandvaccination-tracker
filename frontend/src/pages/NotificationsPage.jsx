import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NotificationItem from '../components/NotificationItem'
import NotificationDemo from '../components/NotificationDemo'
import { Bell, Trash2, Check, Filter, Sparkles } from 'lucide-react'
import useNotificationStore from '../store/notificationStore'

const NotificationsPage = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const unreadCount = useNotificationStore(state => state.unreadCount)
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead)
  const clearAll = useNotificationStore(state => state.clearAll)
  const resetToSampleNotifications = useNotificationStore(state => state.resetToSampleNotifications)
  const [filter, setFilter] = useState('all')
  const [showDemo, setShowDemo] = useState(false)

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead)
      case 'critical':
        return notifications.filter(n => n.severity === 'critical')
      case 'warnings':
        return notifications.filter(n => n.severity === 'warning')
      case 'vaccination':
        return notifications.filter(n => n.type.includes('vaccination'))
      default:
        return notifications
    }
  }

  const filteredNotifications = getFilteredNotifications()

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    critical: notifications.filter(n => n.severity === 'critical').length,
    warnings: notifications.filter(n => n.severity === 'warning').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-600" />
              Notifications
            </h1>
            <p className="text-slate-600 mt-2">Stay updated with vaccination reminders and health alerts</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total', value: stats.total, color: 'bg-blue-100 text-blue-700' },
              { label: 'Unread', value: stats.unread, color: 'bg-purple-100 text-purple-700' },
              { label: 'Critical', value: stats.critical, color: 'bg-red-100 text-red-700' },
              { label: 'Warnings', value: stats.warnings, color: 'bg-yellow-100 text-yellow-700' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${stat.color} p-4 rounded-lg text-center`}
              >
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Tabs and Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'unread', 'critical', 'warnings', 'vaccination', 'demo'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (tab === 'demo') {
                        setShowDemo(!showDemo)
                      } else {
                        setShowDemo(false)
                        setFilter(tab)
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      (tab === 'demo' && showDemo) || (tab !== 'demo' && filter === tab && !showDemo)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {tab === 'demo' && <Sparkles className="w-4 h-4 inline mr-1" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!showDemo && unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    Mark all read
                  </button>
                )}
                {!showDemo && notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-white border border-red-200 rounded-lg text-red-700 hover:bg-red-50 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear all
                  </button>
                )}
                {showDemo && (
                  <button
                    onClick={resetToSampleNotifications}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Load Sample Data
                  </button>
                )}
              </div>
            </div>

            {/* Demo Section */}
            {showDemo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <NotificationDemo />
              </motion.div>
            )}

            {/* Notifications List */}
            {!showDemo && filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-white rounded-lg border border-slate-200"
              >
                <Bell className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-600 font-medium mb-1">No notifications</p>
                <p className="text-slate-500 text-sm">
                  {filter !== 'all' ? `No ${filter} notifications yet` : 'All caught up!'}
                </p>
              </motion.div>
            ) : !showDemo ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05 }}
                className="space-y-3"
              >
                {filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                  />
                ))}
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotificationsPage
