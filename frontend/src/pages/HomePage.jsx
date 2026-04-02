import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Calendar, Heart, Shield, BarChart3, Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useAuthStore from '../store/authStore'

const HomePage = () => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)

  const quickStats = [
    { icon: '🐾', label: 'Pets', value: '3' },
    { icon: '✅', label: 'Healthy Pets', value: '2' },
    { icon: '⚠️', label: 'Pending Tasks', value: '1' },
    { icon: '📅', label: 'Upcoming', value: '2' }
  ]

  const recentPets = [
    { id: 1, name: 'Charlie', species: '🐕', status: '✅ Healthy' },
    { id: 2, name: 'Luna', species: '🐈', status: '⚠️ Attention' },
    { id: 3, name: 'Max', species: '🐕', status: '✅ Healthy' }
  ]

  // Real upcoming appointments from schedule
  const upcomingEvents = [
    { pet: 'Charlie', type: 'Rabies Vaccine', date: 'Mar 24, 2026', icon: '💉', time: '2:30 PM' },
    { pet: 'Luna', type: 'Annual Checkup', date: 'Mar 24, 2026', icon: '👨‍⚕️', time: '3:45 PM' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name || 'Pet Parent'}! 👋
            </h1>
            <p className="text-xl text-slate-600">
              Here's what's happening with your pets today
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {quickStats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card p-6 hover:shadow-lg transition">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-slate-600 text-sm font-semibold mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: 'Check Pet Health', color: 'from-red-500 to-pink-500', action: '/health-check' },
                    { icon: Calendar, label: 'Schedule Checkup', color: 'from-blue-500 to-cyan-500', action: '/schedule' },
                    { icon: Bell, label: 'View Reminders', color: 'from-purple-500 to-pink-500', action: '/notifications' },
                    { icon: BarChart3, label: 'Health Analytics', color: 'from-primary-500 to-blue-600', action: '/dashboard' }
                  ].map((action, idx) => {
                    const Icon = action.icon
                    return (
                      <motion.button
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(action.action)}
                        className={`card p-6 bg-gradient-to-br ${action.color} text-white hover:shadow-lg transition flex flex-col items-center justify-center gap-3 group`}
                      >
                        <Icon className="w-8 h-8 group-hover:scale-110 transition" />
                        <span className="font-semibold text-sm text-center">{action.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Your Pets */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Your Pets</h2>
                  <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentPets.map((pet, idx) => (
                    <motion.div
                      key={pet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{pet.species}</span>
                        <div>
                          <p className="font-semibold text-slate-900">{pet.name}</p>
                          <p className="text-sm text-slate-600">{pet.status}</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ x: 5 }}>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-8 h-fit">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{event.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">{event.pet}</p>
                        <p className="text-sm text-slate-600">{event.type}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span>📅 {event.date}</span>
                          <span>🕐 {event.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/schedule')}
                className="w-full mt-6 btn-primary py-3 font-semibold"
              >
                View All Appointments
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
