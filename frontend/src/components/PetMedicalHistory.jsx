import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Activity, Pill, Stethoscope, TrendingDown, TrendingUp, Calendar, AlertCircle, CheckCircle } from 'lucide-react'

const PetMedicalHistory = ({ pet }) => {
  const [selectedSection, setSelectedSection] = useState('overview')

  if (!pet) {
    return (
      <div className="card p-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">No pet selected</p>
      </div>
    )
  }

  // Generate sample medical history data
  const medicalHistory = [
    {
      id: 1,
      type: 'Illness',
      name: 'Ear Infection',
      date: '2025-11-15',
      description: 'Bacterial ear infection treated with antibiotics',
      status: 'Resolved',
      severity: 'Medium'
    },
    {
      id: 2,
      type: 'Illness',
      name: 'Gastrointestinal Upset',
      date: '2025-08-22',
      description: 'Stomach upset, possible dietary issue',
      status: 'Resolved',
      severity: 'Low'
    },
    {
      id: 3,
      type: 'Injury',
      name: 'Paw Pad Abrasion',
      date: '2025-06-10',
      description: 'Minor abrasion from rough play',
      status: 'Resolved',
      severity: 'Low'
    }
  ]

  const prescriptionHistory = [
    {
      id: 1,
      medication: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Twice daily',
      duration: '10 days',
      reason: 'Ear infection',
      startDate: '2025-11-15',
      endDate: '2025-11-25',
      prescribedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      medication: 'Probiotics',
      dosage: '1 capsule',
      frequency: 'Once daily',
      duration: 'Ongoing',
      reason: 'Digestive health',
      startDate: '2025-09-01',
      endDate: null,
      prescribedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 3,
      medication: 'Flea & Tick Prevention',
      dosage: 'Topical',
      frequency: 'Monthly',
      duration: 'Ongoing',
      reason: 'Parasite prevention',
      startDate: '2025-01-15',
      endDate: null,
      prescribedBy: 'Dr. Michael Chen'
    }
  ]

  const vetVisitHistory = [
    {
      id: 1,
      date: '2026-03-10',
      vetName: 'Dr. Sarah Johnson',
      clinic: 'Pet Health Center',
      reason: 'Annual Checkup',
      notes: 'Excellent health, all vaccines up to date',
      weight: 28.5
    },
    {
      id: 2,
      date: '2025-11-15',
      vetName: 'Dr. Sarah Johnson',
      clinic: 'Pet Health Center',
      reason: 'Ear Infection Follow-up',
      notes: 'Ear infection cleared, continue antibiotics as prescribed',
      weight: 27.8
    },
    {
      id: 3,
      date: '2025-09-20',
      vetName: 'Dr. Michael Chen',
      clinic: 'Downtown Vet Clinic',
      reason: 'Vaccination Update',
      notes: 'DHPP booster administered, rabies vaccination renewed',
      weight: 27.2
    },
    {
      id: 4,
      date: '2025-06-10',
      vetName: 'Dr. Sarah Johnson',
      clinic: 'Pet Health Center',
      reason: 'Routine Checkup',
      notes: 'Healthy, minor paw pad abrasion treated',
      weight: 26.8
    }
  ]

  // Generate weight history data for chart
  const weightData = [
    { date: 'Jan', weight: 25.2 },
    { date: 'Feb', weight: 25.8 },
    { date: 'Mar', weight: 26.2 },
    { date: 'Apr', weight: 26.5 },
    { date: 'May', weight: 26.8 },
    { date: 'Jun', weight: 26.8 },
    { date: 'Jul', weight: 27.0 },
    { date: 'Aug', weight: 27.2 },
    { date: 'Sep', weight: 27.2 },
    { date: 'Oct', weight: 27.5 },
    { date: 'Nov', weight: 27.8 },
    { date: 'Dec', weight: 28.0 },
    { date: 'Mar 26', weight: 28.5 }
  ]

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    return status === 'Resolved' ? 
      <CheckCircle className="w-5 h-5 text-green-600" /> :
      <AlertCircle className="w-5 h-5 text-yellow-600" />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      {/* Pet Header */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{pet.petEmoji || '🐾'}</span>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{pet.name}'s Medical History</h2>
            <p className="text-slate-600">{pet.breed} • {pet.age} years old</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card p-0 overflow-hidden">
        <div className="flex flex-wrap border-b border-slate-200 bg-white">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'illnesses', label: 'Illnesses', icon: AlertCircle },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
            { id: 'visits', label: 'Vet Visits', icon: Stethoscope },
            { id: 'weight', label: 'Weight Tracking', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSection(tab.id)}
                className={`flex-1 px-4 py-4 font-semibold transition flex items-center justify-center gap-2 text-sm ${
                  selectedSection === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Overview */}
          {selectedSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div className="card p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                  <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Past Illnesses</p>
                  <p className="text-2xl font-bold text-slate-900">{medicalHistory.length}</p>
                </motion.div>
                <motion.div className="card p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                  <Pill className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Active Meds</p>
                  <p className="text-2xl font-bold text-slate-900">{prescriptionHistory.filter(p => !p.endDate).length}</p>
                </motion.div>
                <motion.div className="card p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <Stethoscope className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Vet Visits</p>
                  <p className="text-2xl font-bold text-slate-900">{vetVisitHistory.length}</p>
                </motion.div>
                <motion.div className="card p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                  <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Current Weight</p>
                  <p className="text-2xl font-bold text-slate-900">{weightData[weightData.length - 1].weight} kg</p>
                </motion.div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Annual Checkup Completed</p>
                      <p className="text-sm text-slate-600">March 10, 2026 - All vaccines current</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Weight Increased Slightly</p>
                      <p className="text-sm text-slate-600">From 27.8 kg to 28.5 kg - Healthy growth</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Pill className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Probiotics Ongoing</p>
                      <p className="text-sm text-slate-600">Since September 2025 - For digestive health</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Illnesses */}
          {selectedSection === 'illnesses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {medicalHistory.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-slate-900">No Illness History</p>
                  <p className="text-slate-600">Your pet has a clean health record!</p>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                  {medicalHistory.map(illness => (
                    <motion.div
                      key={illness.id}
                      variants={itemVariants}
                      className="card p-6 border-l-4 border-l-orange-500 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900">{illness.name}</h3>
                          <p className="text-slate-600 mt-1">{illness.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusIcon(illness.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Date</p>
                          <p className="font-medium text-slate-900">{new Date(illness.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Status</p>
                          <span className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
                            illness.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {illness.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Severity</p>
                          <span className={`px-2 py-1 rounded text-xs font-semibold inline-block ${getSeverityColor(illness.severity)}`}>
                            {illness.severity}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Type</p>
                          <p className="font-medium text-slate-900">{illness.type}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Prescriptions */}
          {selectedSection === 'prescriptions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {prescriptionHistory.map(prescription => (
                  <motion.div
                    key={prescription.id}
                    variants={itemVariants}
                    className="card p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{prescription.medication}</h3>
                        <p className="text-slate-600 text-sm mt-1">{prescription.reason}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        !prescription.endDate 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {!prescription.endDate ? 'ACTIVE' : 'COMPLETED'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Dosage</p>
                        <p className="font-medium text-slate-900">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Frequency</p>
                        <p className="font-medium text-slate-900">{prescription.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Duration</p>
                        <p className="font-medium text-slate-900">{prescription.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Start Date</p>
                        <p className="font-medium text-slate-900">{new Date(prescription.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">End Date</p>
                        <p className="font-medium text-slate-900">{prescription.endDate ? new Date(prescription.endDate).toLocaleDateString() : 'Ongoing'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Prescribed By</p>
                        <p className="font-medium text-slate-900">{prescription.prescribedBy}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Vet Visits */}
          {selectedSection === 'visits' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {vetVisitHistory.map(visit => (
                  <motion.div
                    key={visit.id}
                    variants={itemVariants}
                    className="card p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{visit.reason}</h3>
                        <p className="text-slate-600 text-sm mt-1">{visit.notes}</p>
                      </div>
                      <span className="text-2xl flex-shrink-0">🏥</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Date</p>
                        <p className="font-medium text-slate-900">{new Date(visit.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Veterinarian</p>
                        <p className="font-medium text-slate-900">{visit.vetName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Clinic</p>
                        <p className="font-medium text-slate-900">{visit.clinic}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold uppercase mb-1">Weight</p>
                        <p className="font-medium text-slate-900">{visit.weight} kg</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Weight Tracking */}
          {selectedSection === 'weight' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Weight Progress Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[24, 30]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      formatter={(value) => [`${value} kg`, 'Weight']}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Weight Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Current Weight</p>
                    <p className="text-3xl font-bold text-blue-600">{weightData[weightData.length - 1].weight}</p>
                    <p className="text-xs text-slate-600 mt-1">kg</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Heaviest</p>
                    <p className="text-3xl font-bold text-green-600">{Math.max(...weightData.map(w => w.weight)).toFixed(1)}</p>
                    <p className="text-xs text-slate-600 mt-1">kg</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Lightest</p>
                    <p className="text-3xl font-bold text-orange-600">{Math.min(...weightData.map(w => w.weight)).toFixed(1)}</p>
                    <p className="text-xs text-slate-600 mt-1">kg</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-slate-600 font-semibold uppercase mb-2">Avg Weight</p>
                    <p className="text-3xl font-bold text-purple-600">{(weightData.reduce((sum, w) => sum + w.weight, 0) / weightData.length).toFixed(1)}</p>
                    <p className="text-xs text-slate-600 mt-1">kg</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Weight History</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[...weightData].reverse().map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-900">{entry.date}</span>
                      <span className="font-bold text-blue-600">{entry.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PetMedicalHistory
