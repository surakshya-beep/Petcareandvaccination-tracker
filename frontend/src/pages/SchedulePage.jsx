import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckupScheduler from '../components/CheckupScheduler'
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react'

const SchedulePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3 mb-3">
              <Calendar className="w-10 h-10 text-blue-600" />
              Pet Checkup Schedule
            </h1>
            <p className="text-slate-600 text-lg">Manage and track all your pets' veterinary appointments in one place</p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-slate-600 text-sm">Total Scheduled</p>
                  <p className="text-2xl font-bold text-slate-900">6</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-slate-600 text-sm">Next 7 Days</p>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-slate-600 text-sm">Completed This Month</p>
                  <p className="text-2xl font-bold text-slate-900">1</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Scheduler Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CheckupScheduler />
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6"
          >
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> Pet Care Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-900">
              <div>
                <h4 className="font-semibold mb-2">📋 Keep Schedule Updated</h4>
                <p>Update appointments as soon as you book them to get timely reminders</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔔 Enable Notifications</h4>
                <p>Get alerts 2-3 days before each appointment to avoid missing them</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💉 Regular Vaccinations</h4>
                <p>Schedule annual checkups and vaccination boosters to keep your pet healthy</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📞 Save Vet Contact Info</h4>
                <p>Store your vet's phone number so you can quickly call to reschedule if needed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SchedulePage
