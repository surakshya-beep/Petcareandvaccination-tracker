import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus, Clock, MapPin, User, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'

/**
 * Pet Checkup Scheduler Component
 * Displays and manages pet checkup appointments in a calendar/list view
 */
const CheckupScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showAddModal, setShowAddModal] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      petName: 'Charlie',
      petType: 'Dog',
      checkupType: 'Vaccination',
      date: new Date(2026, 2, 24),
      time: '14:30',
      vetClinic: 'Happy Paws Veterinary Clinic',
      vetName: 'Dr. Sarah Johnson',
      phone: '(555) 123-4567',
      address: '123 Pet Street, Animal City',
      notes: 'Rabies & DHPP vaccines',
      status: 'scheduled'
    },
    {
      id: 2,
      petName: 'Luna',
      petType: 'Cat',
      checkupType: 'Annual Checkup',
      date: new Date(2026, 2, 24),
      time: '15:45',
      vetClinic: 'Pet Care Medical Center',
      vetName: 'Dr. Mike Chen',
      phone: '(555) 789-0123',
      address: '456 Animal Ave, Pet Town',
      notes: 'Annual examination and bloodwork',
      status: 'scheduled'
    },
    {
      id: 3,
      petName: 'Max',
      petType: 'Dog',
      checkupType: 'Booster Vaccination',
      date: new Date(2026, 2, 25),
      time: '10:00',
      vetClinic: 'Happy Paws Veterinary Clinic',
      vetName: 'Dr. Sarah Johnson',
      phone: '(555) 123-4567',
      address: '123 Pet Street, Animal City',
      notes: 'Bordetella booster - kennel cough protection',
      status: 'scheduled'
    },
    {
      id: 4,
      petName: 'Buddy',
      petType: 'Dog',
      checkupType: 'Dental Cleaning',
      date: new Date(2026, 2, 27),
      time: '10:00',
      vetClinic: 'Smile Dental Vet Care',
      vetName: 'Dr. Emily White',
      phone: '(555) 456-7890',
      address: '789 Tooth Lane, Dental City',
      notes: 'Dental cleaning and oral health assessment',
      status: 'scheduled'
    },
    {
      id: 5,
      petName: 'Daisy',
      petType: 'Dog',
      checkupType: 'Follow-up Checkup',
      date: new Date(2026, 3, 2),
      time: '14:00',
      vetClinic: 'Happy Paws Veterinary Clinic',
      vetName: 'Dr. Sarah Johnson',
      phone: '(555) 123-4567',
      address: '123 Pet Street, Animal City',
      notes: 'Post-surgery follow-up examination',
      status: 'scheduled'
    },
    {
      id: 6,
      petName: 'Rocky',
      petType: 'Dog',
      checkupType: 'Weight Management',
      date: new Date(2026, 3, 5),
      time: '11:30',
      vetClinic: 'Pet Care Medical Center',
      vetName: 'Dr. Mike Chen',
      phone: '(555) 789-0123',
      address: '456 Animal Ave, Pet Town',
      notes: 'Check-in for weight loss program',
      status: 'scheduled'
    }
  ])

  const [newAppointment, setNewAppointment] = useState({
    petName: '',
    petType: 'Dog',
    checkupType: 'Annual Checkup',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    vetClinic: '',
    vetName: '',
    phone: '',
    address: '',
    notes: ''
  })

  const getCheckupIcon = (type) => {
    switch(type) {
      case 'Vaccination':
      case 'Booster Vaccination':
        return '💉'
      case 'Annual Checkup':
        return '👨‍⚕️'
      case 'Dental Cleaning':
        return '🪥'
      case 'Follow-up Checkup':
        return '✓'
      case 'Weight Management':
        return '⚖️'
      default:
        return '📋'
    }
  }

  const getCheckupColor = (type) => {
    switch(type) {
      case 'Vaccination':
      case 'Booster Vaccination':
        return 'bg-red-50 border-l-red-500 text-red-700'
      case 'Annual Checkup':
        return 'bg-blue-50 border-l-blue-500 text-blue-700'
      case 'Dental Cleaning':
        return 'bg-green-50 border-l-green-500 text-green-700'
      case 'Follow-up Checkup':
        return 'bg-purple-50 border-l-purple-500 text-purple-700'
      case 'Weight Management':
        return 'bg-yellow-50 border-l-yellow-500 text-yellow-700'
      default:
        return 'bg-slate-50 border-l-slate-500 text-slate-700'
    }
  }

  const getUpcomingAppointments = () => {
    return appointments.sort((a, b) => a.date - b.date)
  }

  const getAppointmentsByDate = (date) => {
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    )
  }

  const getDaysUntilAppointment = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    const daysUntil = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil;
  }

  const formatDateLabel = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.petName || !newAppointment.vetClinic) {
      alert('Please fill in required fields');
      return;
    }

    const appointment = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      ...newAppointment,
      date: new Date(newAppointment.date),
      status: 'scheduled'
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      petName: '',
      petType: 'Dog',
      checkupType: 'Annual Checkup',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      vetClinic: '',
      vetName: '',
      phone: '',
      address: '',
      notes: ''
    });
    setShowAddModal(false);
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  }

  const upcomingAppointments = getUpcomingAppointments();
  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="space-y-6">
      {/* Next Appointment Alert */}
      {nextAppointment && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">Next Appointment</h3>
              <p className="mt-2">
                <strong>{nextAppointment.petName}</strong> has a {nextAppointment.checkupType.toLowerCase()} appointment in <strong>{getDaysUntilAppointment(nextAppointment.date)}</strong> days
              </p>
              <p className="text-sm mt-2 text-blue-100">
                📅 {formatDateLabel(nextAppointment.date)} at {nextAppointment.time} | 📍 {nextAppointment.vetClinic}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            Pet Checkup Schedule
          </h2>
          <p className="text-slate-600 mt-2">{appointments.length} total appointments scheduled</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add Appointment
        </motion.button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('list')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            viewMode === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
          }`}
        >
          📋 List View
        </button>
        <button
          onClick={() => setViewMode('calendar')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            viewMode === 'calendar'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
          }`}
        >
          📅 Calendar View
        </button>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
              <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-600 font-medium">No appointments scheduled</p>
              <p className="text-slate-500 text-sm mt-1">Click "Add Appointment" to schedule a checkup</p>
            </div>
          ) : (
            upcomingAppointments.map((appointment, idx) => {
              const daysUntil = getDaysUntilAppointment(appointment.date);
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-l-4 border-slate-200 ${getCheckupColor(appointment.checkupType)} p-5 rounded-lg shadow-sm hover:shadow-md transition`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Title */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{getCheckupIcon(appointment.checkupType)}</span>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{appointment.petName}</h3>
                          <p className="text-sm text-slate-600">{appointment.checkupType}</p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Date & Time */}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">{formatDateLabel(appointment.date)}</p>
                            <p className="text-xs text-slate-500">in <strong>{daysUntil}</strong> days</p>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{appointment.time}</p>
                        </div>

                        {/* Clinic */}
                        <div className="flex items-center gap-2 md:col-span-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <div className="text-sm">
                            <p className="font-medium text-slate-700">{appointment.vetClinic}</p>
                            <p className="text-xs text-slate-500">{appointment.address}</p>
                          </div>
                        </div>

                        {/* Vet */}
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{appointment.vetName}</p>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📞</span>
                          <p className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{appointment.phone}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-white/50 rounded">
                          <p className="text-sm text-slate-700">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="p-2 rounded-lg bg-white/50 hover:bg-red-100 text-red-600 transition"
                        title="Delete appointment"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </motion.div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="space-y-6">
            {upcomingAppointments.map((appointment, idx) => {
              const dayGroup = formatDateLabel(appointment.date);
              const isFirstOfDay = idx === 0 || formatDateLabel(upcomingAppointments[idx - 1].date) !== dayGroup;
              
              return (
                <div key={appointment.id}>
                  {isFirstOfDay && (
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      📅 {dayGroup}
                    </h3>
                  )}
                  <div className={`${getCheckupColor(appointment.checkupType)} border-l-4 border-slate-200 p-4 rounded-lg ml-4 mb-3`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getCheckupIcon(appointment.checkupType)}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{appointment.petName}</h4>
                        <p className="text-sm text-slate-600">{appointment.checkupType}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{appointment.time}</span>
                          <span className="text-sm text-slate-600 ml-4">{appointment.vetClinic}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Add Appointment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <form onSubmit={handleAddAppointment} className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Appointment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Pet Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pet Name *</label>
                    <input
                      type="text"
                      required
                      value={newAppointment.petName}
                      onChange={(e) => setNewAppointment({...newAppointment, petName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., Charlie"
                    />
                  </div>

                  {/* Pet Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pet Type</label>
                    <select
                      value={newAppointment.petType}
                      onChange={(e) => setNewAppointment({...newAppointment, petType: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Checkup Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Checkup Type</label>
                    <select
                      value={newAppointment.checkupType}
                      onChange={(e) => setNewAppointment({...newAppointment, checkupType: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Annual Checkup">Annual Checkup</option>
                      <option value="Vaccination">Vaccination</option>
                      <option value="Booster Vaccination">Booster Vaccination</option>
                      <option value="Dental Cleaning">Dental Cleaning</option>
                      <option value="Follow-up Checkup">Follow-up Checkup</option>
                      <option value="Weight Management">Weight Management</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Vet Clinic */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Vet Clinic *</label>
                    <input
                      type="text"
                      required
                      value={newAppointment.vetClinic}
                      onChange={(e) => setNewAppointment({...newAppointment, vetClinic: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., Happy Paws Veterinary Clinic"
                    />
                  </div>

                  {/* Vet Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Vet Name</label>
                    <input
                      type="text"
                      value={newAppointment.vetName}
                      onChange={(e) => setNewAppointment({...newAppointment, vetName: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={newAppointment.phone}
                      onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., (555) 123-4567"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={newAppointment.address}
                      onChange={(e) => setNewAppointment({...newAppointment, address: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g., 123 Pet Street, Animal City"
                    />
                  </div>

                  {/* Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                    <textarea
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      rows="3"
                      placeholder="e.g., Service details, special instructions, etc."
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg font-medium hover:bg-slate-300 transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Appointment
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CheckupScheduler
