import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PetCard from '../components/PetCard'
import AddPetModal from '../components/AddPetModal'
import mockPets from '../data/mockPets'
import { checkVaccineStatus } from '../utils/vaccineUtils'
import { Plus, AlertCircle, CheckCircle, Clock, Activity, TrendingUp, Calendar, Heart, Zap } from 'lucide-react'

const DashboardPage = () => {
  const [pets, setPets] = useState(mockPets)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false)

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'healthy') {
      const status = checkVaccineStatus(pet.medicalRecords)
      return matchesSearch && status.status === 'Healthy'
    }
    if (filterStatus === 'warning') {
      const status = checkVaccineStatus(pet.medicalRecords)
      return matchesSearch && status.status === 'Warning'
    }
    if (filterStatus === 'critical') {
      const status = checkVaccineStatus(pet.medicalRecords)
      return matchesSearch && status.status === 'Critical'
    }
    return matchesSearch
  })

  const handleAddPet = (petData) => {
    const newPet = {
      id: pets.length + 1,
      ...petData,
      weightHistory: [{ date: new Date().toISOString().split('T')[0], value: 25, unit: 'kg' }],
      medicalRecords: [
        {
          id: `rec${pets.length + 1}`,
          type: 'Checkup',
          description: 'Initial Checkup',
          dateAdministered: new Date().toISOString().split('T')[0],
          nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Completed',
          vetName: 'Dr. Smith',
          vetClinic: 'Pet Health Center'
        }
      ]
    }
    setPets([...pets, newPet])
    setIsAddPetModalOpen(false)
  }

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    const totalPets = pets.length
    const healthyPets = pets.filter(p => checkVaccineStatus(p.medicalRecords).status === 'Healthy').length
    const warningPets = pets.filter(p => checkVaccineStatus(p.medicalRecords).status === 'Warning').length
    const criticalPets = pets.filter(p => checkVaccineStatus(p.medicalRecords).status === 'Critical').length
    
    return { totalPets, healthyPets, warningPets, criticalPets }
  }, [pets])

  const upcomingAppointments = [
    { pet: 'Charlie', type: 'Rabies Vaccine', date: 'Mar 25', icon: '💉' },
    { pet: 'Luna', type: 'Annual Checkup', date: 'Mar 28', icon: '👨‍⚕️' },
    { pet: 'Max', type: 'Weight Check', date: 'Apr 2', icon: '⚖️' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Dashboard
                  </h1>
                </div>
                <p className="text-lg text-slate-600 ml-4">
                  Welcome back! Here's your pets' health overview
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddPetModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus className="w-5 h-5" />
                Add New Pet
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            <motion.div 
              variants={itemVariants} 
              whileHover={{ translateY: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">Total Pets</p>
                  <p className="text-4xl font-bold text-slate-900">{stats.totalPets}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">All your pets tracked</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                  🐾
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ translateY: -4, boxShadow: '0 20px 25px -5px rgba(34, 197, 94, 0.1)' }}
              className="card p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">Healthy</p>
                  <p className="text-4xl font-bold text-success-600">{stats.healthyPets}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">In great condition</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success-500" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ translateY: -4, boxShadow: '0 20px 25px -5px rgba(217, 119, 6, 0.1)' }}
              className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-warning-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">Needs Attention</p>
                  <p className="text-4xl font-bold text-warning-600">{stats.warningPets}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Check soon</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-warning-500" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ translateY: -4, boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.1)' }}
              className="card p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-danger-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1 uppercase tracking-wide">Critical</p>
                  <p className="text-4xl font-bold text-danger-600">{stats.criticalPets}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Urgent action needed</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-danger-500" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card mb-10 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Upcoming Appointments</h3>
                  <p className="text-sm text-slate-600">Next scheduled pet care events</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingAppointments.map((apt, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{apt.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{apt.pet}</p>
                      <p className="text-sm text-slate-600 mt-1">{apt.type}</p>
                      <p className="text-xs font-medium text-purple-600 mt-2">{apt.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search & Filter Bar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card mb-10 p-6 flex gap-4 flex-col md:flex-row md:items-center bg-white border border-slate-200"
          >
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="🔍 Search by pet name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field px-4 py-2.5 md:min-w-[200px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">📊 All Pets</option>
              <option value="healthy">✅ Healthy Only</option>
              <option value="warning">⚠️ Needs Attention</option>
              <option value="critical">🚨 Critical</option>
            </select>
          </motion.div>

          {/* Pets Grid Section */}
          {filteredPets.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    Your Pets <span className="text-slate-500 font-normal">({filteredPets.length} of {pets.length})</span>
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Manage and track your pet's health</p>
                </div>
                {filteredPets.length < pets.length && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterStatus('all')}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Clear filters
                  </motion.button>
                )}
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
              >
                {filteredPets.map((pet) => (
                  <motion.div key={pet.id} variants={itemVariants}>
                    <PetCard pet={pet} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-12 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm">
                <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-2xl text-slate-600 font-semibold mb-2">No pets found</p>
                <p className="text-slate-500 mb-6">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start by adding your first pet to get started'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddPetModalOpen(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Pet
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DashboardPage
