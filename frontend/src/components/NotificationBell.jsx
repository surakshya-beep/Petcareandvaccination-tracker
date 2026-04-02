import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell } from 'lucide-react'
import useNotificationStore from '../store/notificationStore'
import NotificationCenter from './NotificationCenter'

const NotificationBell = () => {
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false)
  const unreadCount = useNotificationStore(state => state.unreadCount)
  const criticalNotifications = useNotificationStore(state => state.getCriticalNotifications())

  const hasCritical = criticalNotifications.length > 0

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsNotificationCenterOpen(true)}
        className={`relative p-2 rounded-lg transition ${
          hasCritical
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <Bell className="w-5 h-5" />

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                hasCritical ? 'bg-red-500' : 'bg-blue-500'
              }`}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Critical pulse animation */}
        {hasCritical && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-lg bg-red-500 opacity-20"
          />
        )}
      </motion.button>

      {/* Notification Center Modal */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
      />
    </>
  )
}

export default NotificationBell
