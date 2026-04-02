/**
 * Notification Routes
 * Handles all notification-related endpoints
 */

const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Middleware to check authentication (implement based on your auth system)
const authMiddleware = (req, res, next) => {
  // Add your authentication logic here
  next();
};

/**
 * GET /api/notifications/:userId
 * Fetch all notifications for a user with optional filter
 */
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { filter = 'all' } = req.query;

    let query = { userId, isDismissed: false };

    if (filter === 'unread') {
      query.isRead = false;
    } else if (filter === 'critical') {
      query.severity = 'critical';
    } else if (filter === 'warnings') {
      query.severity = 'warning';
    } else if (filter === 'vaccination') {
      query.type = { $regex: 'vaccination' };
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .populate('petId', 'name species')
      .exec();

    res.json({
      success: true,
      data: notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message
    });
  }
});

/**
 * GET /api/notifications/:userId/unread-count
 * Get count of unread notifications
 */
router.get('/:userId/unread-count', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const unreadCount = await Notification.countDocuments({
      userId,
      isRead: false,
      isDismissed: false
    });

    res.json({
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count',
      error: error.message
    });
  }
});

/**
 * GET /api/notifications/:userId/critical
 * Get all critical notifications
 */
router.get('/:userId/critical', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const criticalNotifications = await Notification.find({
      userId,
      severity: 'critical',
      isDismissed: false
    })
      .sort({ createdAt: -1 })
      .populate('petId', 'name species')
      .exec();

    res.json({
      success: true,
      data: criticalNotifications,
      count: criticalNotifications.length
    });
  } catch (error) {
    console.error('Error getting critical notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get critical notifications',
      error: error.message
    });
  }
});

/**
 * PATCH /api/notifications/:notificationId/read
 * Mark a notification as read
 */
router.patch('/:notificationId/read', authMiddleware, async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: notification,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: error.message
    });
  }
});

/**
 * PATCH /api/notifications/:userId/read-all
 * Mark all notifications as read for a user
 */
router.patch('/:userId/read-all', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.updateMany(
      { userId, isRead: false },
      {
        isRead: true,
        readAt: new Date()
      }
    );

    res.json({
      success: true,
      message: `Marked ${result.modifiedCount} notifications as read`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read',
      error: error.message
    });
  }
});

/**
 * PATCH /api/notifications/:notificationId/dismiss
 * Dismiss a notification
 */
router.patch('/:notificationId/dismiss', authMiddleware, async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isDismissed: true,
        dismissedAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: notification,
      message: 'Notification dismissed'
    });
  } catch (error) {
    console.error('Error dismissing notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to dismiss notification',
      error: error.message
    });
  }
});

/**
 * DELETE /api/notifications/:notificationId
 * Delete a notification
 */
router.delete('/:notificationId', authMiddleware, async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message
    });
  }
});

/**
 * DELETE /api/notifications/:userId/clear-all
 * Clear all notifications for a user
 */
router.delete('/:userId/clear-all', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.deleteMany({ userId });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} notifications`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear notifications',
      error: error.message
    });
  }
});

module.exports = router;
