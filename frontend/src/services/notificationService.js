/**
 * Notification API Service
 * Handles all notification-related API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NotificationService = {
  /**
   * Fetch all notifications for a user
   */
  fetchNotifications: async (userId, filter = 'all') => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}?filter=${filter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
      return await response.json();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}/read-all`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to mark all notifications as read');
      return await response.json();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  /**
   * Dismiss a notification
   */
  dismissNotification: async (notificationId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${notificationId}/dismiss`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to dismiss notification');
      return await response.json();
    } catch (error) {
      console.error('Error dismissing notification:', error);
      throw error;
    }
  },

  /**
   * Delete a notification
   */
  deleteNotification: async (notificationId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete notification');
      return await response.json();
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}/unread-count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to get unread count');
      const data = await response.json();
      return data.unreadCount;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  },

  /**
   * Get critical notifications
   */
  getCriticalNotifications: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}/critical`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to get critical notifications');
      return await response.json();
    } catch (error) {
      console.error('Error getting critical notifications:', error);
      throw error;
    }
  },

  /**
   * Clear all notifications for a user
   */
  clearAllNotifications: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}/clear-all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to clear all notifications');
      return await response.json();
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      throw error;
    }
  }
};

export default NotificationService;
