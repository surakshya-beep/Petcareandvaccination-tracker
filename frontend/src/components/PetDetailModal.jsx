import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Calendar, Scale, Stethoscope, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { calculatePetAge } from '../utils/vaccineUtils'

const PetDetailModal = ({ pet, healthStatus, onClose }) => {
  const petAge = calculatePetAge(new Date(pet.dob))
  const dob = new Date(pet.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  const getRecordIcon = (type) => {
    switch(type) {
      case 'Vaccine':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'Surgery':
        return <Stethoscope className="w-5 h-5 text-purple-600" />
      case 'Checkup':
        return <Heart className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-slate-600" />
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return <span className="badge badge-success">Completed</span>
      case 'Pending':
        return <span className="badge badge-warning">Pending</span>
      default:
        return <span className="badge bg-slate-100 text-slate-700">{status}</span>
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right p-2 hover:bg-slate-100 rounded-lg transition z-10"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>

          {/* Pet Header */}
          <div className="p-8 pb-6 border-b border-slate-200">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{pet.species === 'Dog' ? '🐕' : '🐈'}</div>
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-slate-900 mb-2">{pet.name}</h2>
                <p className="text-lg text-slate-600 mb-4">{pet.breed} • {pet.species}</p>
                <div className="inline-block px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold">
                  Health Status: {healthStatus.status}
                </div>
              </div>
            </div>
          </div>

          {/* Pet Info Grid */}
          <div className="p-8 pb-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-200">
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Age</p>
              <p className="text-2xl font-bold text-slate-900">{petAge.years}y {petAge.months}m</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Birth Date</p>
              <p className="text-lg font-semibold text-slate-900">{dob}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Current Weight</p>
              <p className="text-2xl font-bold text-slate-900">
                {pet.weightHistory?.[pet.weightHistory.length - 1]?.value || 'N/A'} {pet.weightHistory?.[pet.weightHistory.length - 1]?.unit || 'kg'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Microchip ID</p>
              <p className="text-sm font-mono text-slate-900 break-all">{pet.microchipID}</p>
            </div>
          </div>

          {/* Health Issues */}
          {healthStatus.issueCount > 0 && (
            <div className="p-8 pb-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning-600" />
                Health Issues ({healthStatus.issueCount})
              </h3>
              <div className="space-y-3">
                {healthStatus.issues.map((issue, idx) => (
                  <div key={idx} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-900">{issue.message}</p>
                    <p className="text-sm text-yellow-700 mt-1">Severity: {issue.severity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Records */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Medical Records
            </h3>
            {pet.medicalRecords && pet.medicalRecords.length > 0 ? (
              <div className="space-y-4">
                {pet.medicalRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {getRecordIcon(record.type)}
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{record.description}</h4>
                          <p className="text-sm text-slate-600">{record.type}</p>
                        </div>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 font-semibold">Given</p>
                        <p className="text-slate-900">
                          {new Date(record.dateAdministered).toLocaleDateString()}
                        </p>
                      </div>
                      {record.nextDueDate && (
                        <div>
                          <p className="text-slate-600 font-semibold">Next Due</p>
                          <p className="text-slate-900">
                            {new Date(record.nextDueDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {record.vetName && (
                        <div>
                          <p className="text-slate-600 font-semibold">Veterinarian</p>
                          <p className="text-slate-900">{record.vetName}</p>
                        </div>
                      )}
                      {record.vetClinic && (
                        <div>
                          <p className="text-slate-600 font-semibold">Clinic</p>
                          <p className="text-slate-900">{record.vetClinic}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600">No medical records yet</p>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="p-8 border-t border-slate-200 flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PetDetailModal
