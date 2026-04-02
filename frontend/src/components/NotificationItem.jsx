import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import useNotificationStore from '../store/notificationStore'

const NotificationItem = ({ notification, onDismiss }) => {
  const markAsRead = useNotificationStore(state => state.markAsRead)
  const dismissNotification = useNotificationStore(state => state.dismissNotification)

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-red-50 border-l-4 border-red-500',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          badge: 'bg-red-100 text-red-800',
          button: 'hover:bg-red-100'
        }
      case 'warning':
        return {
          container: 'bg-yellow-50 border-l-4 border-yellow-500',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
          badge: 'bg-yellow-100 text-yellow-800',
          button: 'hover:bg-yellow-100'
        }
      default:
        return {
          container: 'bg-blue-50 border-l-4 border-blue-500',
          icon: <Info className="w-5 h-5 text-blue-500" />,
          badge: 'bg-blue-100 text-blue-800',
          button: 'hover:bg-blue-100'
        }
    }
  }

  const styles = getSeverityStyles(notification.severity)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${styles.container} p-4 rounded-lg mb-3 shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-sm">
                {notification.title}
              </h3>
              <p className="text-xs text-slate-700 mt-1">
                {notification.message}
              </p>
              {notification.daysUntilDue !== undefined && (
                <p className="text-xs text-slate-600 mt-2">
                  {notification.daysUntilDue < 0
                    ? `⏰ ${Math.abs(notification.daysUntilDue)} days overdue`
                    : `📅 Due in ${notification.daysUntilDue} days`}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className={`p-1 rounded transition ${styles.button}`}
                  title="Mark as read"
                >
                  <span className="text-xs">✓</span>
                </button>
              )}
              <button
                onClick={() => dismissNotification(notification._id)}
                className={`p-1 rounded transition ${styles.button}`}
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotificationItem
