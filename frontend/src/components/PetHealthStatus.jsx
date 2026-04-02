import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Pill, Calendar, AlertCircle, CheckCircle, Heart, TrendingUp, Syringe, Activity } from 'lucide-react'
import { checkVaccineStatus } from '../utils/vaccineUtils'

const PetHealthStatus = ({ pets = [] }) => {
  const [expandedPetId, setExpandedPetId] = useState(null)

  const getVaccineIcon = (type) => {
    const iconMap = {
      'vaccinate': <Syringe className="w-4 h-4" />,
      'checkup': <Activity className="w-4 h-4" />,
      'dental': <AlertCircle className="w-4 h-4" />,
      'surgery': <AlertCircle className="w-4 h-4" />
    }
    return iconMap[type] || <Pill className="w-4 h-4" />
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Healthy': return 'bg-green-50 border-green-200'
      case 'Warning': return 'bg-yellow-50 border-yellow-200'
      case 'Critical': return 'bg-red-50 border-red-200'
      default: return 'bg-slate-50 border-slate-200'
    }
  }

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Healthy': return 'bg-green-100 text-green-800'
      case 'Warning': return 'bg-yellow-100 text-yellow-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Healthy': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'Warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'Critical': return <AlertCircle className="w-5 h-5 text-red-600" />
      default: return <Activity className="w-5 h-5 text-slate-600" />
    }
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
    <div className="space-y-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {pets.length === 0 ? (
          <div className="card p-12 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">No pets added yet</p>
            <p className="text-slate-500 text-sm">Add your first pet to track their health</p>
          </div>
        ) : (
          pets.map((pet) => {
            const healthStatus = checkVaccineStatus(pet.medicalRecords)
            const isExpanded = expandedPetId === pet.id

            return (
              <motion.div
                key={pet.id}
                variants={itemVariants}
                className={`card border-2 cursor-pointer transition ${getStatusColor(healthStatus.status)}`}
                onClick={() => setExpandedPetId(isExpanded ? null : pet.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between p-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-5xl">{pet.petEmoji || '🐾'}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">{pet.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(healthStatus.status)}`}>
                          {healthStatus.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span>{pet.breed} • {pet.age} years</span>
                        <span>Weight: {pet.weightHistory ? pet.weightHistory[pet.weightHistory.length - 1]?.value : 'N/A'} {pet.weightHistory ? pet.weightHistory[0]?.unit : 'kg'}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {getStatusIcon(healthStatus.status)}
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-current opacity-20 px-6 py-6 space-y-6">
                    {/* Vaccination Status */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Syringe className="w-5 h-5" />
                        Vaccination Records
                      </h4>
                      <div className="space-y-2">
                        {pet.medicalRecords && pet.medicalRecords.length > 0 ? (
                          pet.medicalRecords.map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">{record.type}</p>
                                <p className="text-xs text-slate-600">{record.description}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                  {record.dateAdministered && `Given: ${new Date(record.dateAdministered).toLocaleDateString()}`}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                                  record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                  record.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}>
                                  {record.status}
                                </div>
                                {record.nextDueDate && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    Next: {new Date(record.nextDueDate).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-600 text-sm">No vaccination records</p>
                        )}
                      </div>
                    </div>

                    {/* Health Metrics */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Health Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Weight</p>
                          <p className="font-bold text-slate-900">
                            {pet.weightHistory ? pet.weightHistory[pet.weightHistory.length - 1]?.value : 'N/A'} {pet.weightHistory ? pet.weightHistory[0]?.unit : 'kg'}
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Age</p>
                          <p className="font-bold text-slate-900">{pet.age} years</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Species</p>
                          <p className="font-bold text-slate-900 capitalize">{pet.type}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Breed</p>
                          <p className="font-bold text-slate-900">{pet.breed}</p>
                        </div>
                      </div>
                    </div>

                    {/* Vet Information */}
                    {pet.medicalRecords && pet.medicalRecords[0] && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Last Veterinary Visit
                        </h4>
                        <div className="p-4 bg-white rounded-lg space-y-2">
                          <div>
                            <p className="text-xs text-slate-600">Veterinarian</p>
                            <p className="font-medium text-slate-900">{pet.medicalRecords[0].vetName || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600">Clinic</p>
                            <p className="font-medium text-slate-900">{pet.medicalRecords[0].vetClinic || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })
        )}
      </motion.div>
    </div>
  )
}

export default PetHealthStatus
