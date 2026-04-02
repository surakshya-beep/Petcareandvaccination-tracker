import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PetHealthStatus from './PetHealthStatus'
import HealthReminders from './HealthReminders'
import { Heart, AlertCircle, Calendar, Activity, BookOpen, ArrowRight } from 'lucide-react'
import mockPets from '../data/mockPets'
import { checkVaccineStatus } from '../utils/vaccineUtils'

const HealthCheck = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Calculate health stats
  const totalPets = mockPets.length
  const healthyCount = mockPets.filter(p => checkVaccineStatus(p.medicalRecords).status === 'Healthy').length
  const pendingCareCount = mockPets.filter(p => checkVaccineStatus(p.medicalRecords).status !== 'Healthy').length

  const tabs = [
    { id: 'overview', label: 'Health Overview', icon: Heart },
    { id: 'status', label: 'Pet Status', icon: Activity },
    { id: 'reminders', label: 'Health Reminders', icon: AlertCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-600 rounded"></div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Pet Health Center</h1>
            </div>
            <p className="text-xl text-slate-600 ml-4">Monitor and manage your pets' health and wellness</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
          >
            <motion.div variants={itemVariants} className="card p-6 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase mb-1">Total Pets</p>
                  <p className="text-3xl font-bold text-slate-900">{totalPets}</p>
                </div>
                <span className="text-4xl">🐾</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ delay: 0.1 }} className="card p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase mb-1">Healthy Pets</p>
                  <p className="text-3xl font-bold text-green-600">{healthyCount}</p>
                </div>
                <span className="text-4xl">✅</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ delay: 0.2 }} className="card p-6 bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase mb-1">Pending Care</p>
                  <p className="text-3xl font-bold text-amber-600">{pendingCareCount}</p>
                </div>
                <span className="text-4xl">⏰</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ delay: 0.3 }} className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-semibold uppercase mb-1">Next Checkup</p>
                  <p className="text-lg font-bold text-blue-600">Mar 24</p>
                </div>
                <span className="text-4xl">📅</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Medical History Quick Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <motion.button
              whileHover={{ y: -2, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              onClick={() => navigate('/medical-history')}
              className="w-full card p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300 transition text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition">View Medical History</h3>
                    <p className="text-sm text-slate-600 mt-1">Track illnesses, prescriptions, vet visits & weight monitoring</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition flex-shrink-0" />
              </div>
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card p-0 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 bg-white">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center gap-2 ${
                        activeTab === tab.id
                          ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Pets' Health Status</h2>
                      <PetHealthStatus pets={mockPets} />
                    </div>
                  </motion.div>
                )}

                {/* Status Tab */}
                {activeTab === 'status' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Pet Health Status</h2>
                      <PetHealthStatus pets={mockPets} />
                    </div>
                  </motion.div>
                )}

                {/* Reminders Tab */}
                {activeTab === 'reminders' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Health Care Reminders</h2>
                      <HealthReminders />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HealthCheck
