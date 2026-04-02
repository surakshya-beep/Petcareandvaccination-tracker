import { create } from 'zustand';

// Helper function to format dates
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatDateTime = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' at 2:30 PM';
};

// Get upcoming dates
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const in2Days = new Date(today);
in2Days.setDate(in2Days.getDate() + 2);

const in3Days = new Date(today);
in3Days.setDate(in3Days.getDate() + 3);

const in5Days = new Date(today);
in5Days.setDate(in5Days.getDate() + 5);

const in7Days = new Date(today);
in7Days.setDate(in7Days.getDate() + 7);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const in3DaysAgo = new Date(today);
in3DaysAgo.setDate(in3DaysAgo.getDate() - 3);

// Mock notifications for demonstration - realistic scenarios
const mockNotifications = [
  {
    _id: '1',
    type: 'appointment_reminder',
    severity: 'warning',
    title: '🏥 vaccination appointment in 2 days',
    message: `Charlie has a vaccination appointment scheduled for ${formatDateTime(in2Days)}. Rabies & DHPP vaccines will be administered.`,
    petName: 'Charlie',
    petType: 'Dog',
    vaccinationType: 'Rabies & DHPP',
    daysUntilDue: 2,
    isRead: false,
    isDismissed: false,
    createdAt: today,
    dueDate: in2Days,
    appointmentTime: '2:30 PM',
    vetClinic: 'Happy Paws Veterinary Clinic',
    vetPhone: '(555) 123-4567'
  },
  {
    _id: '2',
    type: 'appointment_reminder',
    severity: 'warning',
    title: '🏥 Doctor appointment coming up',
    message: `Luna has a wellness checkup scheduled for ${formatDateTime(in2Days)}. Annual examination and bloodwork.`,
    petName: 'Luna',
    petType: 'Cat',
    vaccinationType: 'Annual Checkup',
    daysUntilDue: 2,
    isRead: false,
    isDismissed: false,
    createdAt: today,
    dueDate: in2Days,
    appointmentTime: '3:45 PM',
    vetClinic: 'Pet Care Medical Center',
    vetPhone: '(555) 789-0123'
  },
  {
    _id: '3',
    type: 'vaccination_due',
    severity: 'warning',
    title: '💉 Booster vaccination reminder in 3 days',
    message: `Max needs Bordetella booster vaccination in 3 days (${formatDate(in3Days)}). This protects against kennel cough. Schedule appointment now to secure your preferred time.`,
    petName: 'Max',
    petType: 'Dog',
    vaccinationType: 'Bordetella Booster',
    daysUntilDue: 3,
    isRead: false,
    isDismissed: false,
    createdAt: today,
    dueDate: in3Days
  },
  {
    _id: '4',
    type: 'appointment_reminder',
    severity: 'info',
    title: '📅 Upcoming veterinary checkup',
    message: `Buddy has a scheduled appointment for ${formatDateTime(in5Days)} for dental cleaning and oral health assessment.`,
    petName: 'Buddy',
    petType: 'Dog',
    vaccinationType: 'Dental Cleaning',
    daysUntilDue: 5,
    isRead: true,
    isDismissed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: in5Days,
    appointmentTime: '10:00 AM',
    vetClinic: 'Smile Dental Vet Care'
  },
  {
    _id: '5',
    type: 'vaccination_due',
    severity: 'info',
    title: '💉 Upcoming vaccination',
    message: `Daisy's Lepto vaccine is coming up in 7 days (${formatDate(in7Days)}). Give your vet a call to book an appointment.`,
    petName: 'Daisy',
    petType: 'Dog',
    vaccinationType: 'Leptospirosis',
    daysUntilDue: 7,
    isRead: true,
    isDismissed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    dueDate: in7Days
  },
  {
    _id: '6',
    type: 'vaccination_completed',
    severity: 'info',
    title: '✅ Vaccination completed successfully',
    message: `Rocky completed his Rabies booster vaccination on ${formatDate(yesterday)}. Next booster due in 1 year.`,
    petName: 'Rocky',
    petType: 'Dog',
    vaccinationType: 'Rabies Booster',
    isRead: true,
    isDismissed: false,
    createdAt: yesterday,
    completionDate: yesterday,
    nextDueDate: new Date(yesterday.getTime() + 365 * 24 * 60 * 60 * 1000)
  }
];

const useNotificationStore = create((set, get) => ({
  // State
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.isRead).length,
  filter: 'all', // 'all', 'unread', 'critical', 'warnings'
  
  // Actions
  setNotifications: (notifications) =>
    set((state) => ({
      notifications,
      unreadCount: notifications.filter(n => !n.isRead).length
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.isRead ? state.unreadCount : state.unreadCount + 1
    })),

  removeNotification: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find(n => n._id === notificationId);
      return {
        notifications: state.notifications.filter(n => n._id !== notificationId),
        unreadCount: notification && !notification.isRead ? state.unreadCount - 1 : state.unreadCount
      };
    }),

  markAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map(n =>
        n._id === notificationId ? { ...n, isRead: true, readAt: new Date() } : n
      ),
      unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map(n => ({
        ...n,
        isRead: true,
        readAt: new Date()
      })),
      unreadCount: 0
    })),

  dismissNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map(n =>
        n._id === notificationId ? { ...n, isDismissed: true, dismissedAt: new Date() } : n
      )
    })),

  setFilter: (filter) => set({ filter }),

  getFilteredNotifications: () => {
    const state = get();
    const { notifications, filter } = state;

    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead && !n.isDismissed);
      case 'critical':
        return notifications.filter(n => n.severity === 'critical' && !n.isDismissed);
      case 'warnings':
        return notifications.filter(n => n.severity === 'warning' && !n.isDismissed);
      default:
        return notifications.filter(n => !n.isDismissed);
    }
  },

  getCriticalNotifications: () => {
    const state = get();
    return state.notifications.filter(n => n.severity === 'critical' && !n.isDismissed);
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),

  // Demo function - Reset to sample notifications
  resetToSampleNotifications: () => set({
    notifications: mockNotifications,
    unreadCount: mockNotifications.filter(n => !n.isRead).length
  })
}));

export default useNotificationStore;
export { mockNotifications };
