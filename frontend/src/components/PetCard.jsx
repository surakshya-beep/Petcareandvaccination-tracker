import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Calendar, Scale, Zap, Eye, QrCode, Heart, Activity } from 'lucide-react'
import QRCodeModal from './QRCodeModal'
import PetDetailModal from './PetDetailModal'
import { checkVaccineStatus, getHealthIndicator, calculatePetAge } from '../utils/vaccineUtils'

const PetCard = ({ pet }) => {
  const [showQR, setShowQR] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const healthStatus = checkVaccineStatus(pet.medicalRecords || [])
  const healthIndicator = getHealthIndicator(healthStatus.status)
  const petAge = calculatePetAge(new Date(pet.dob))
  const currentWeight = pet.weightHistory?.[pet.weightHistory.length - 1]

  const statusColors = {
    'Healthy': { icon: '✅', borderColor: 'border-success-500', bgColor: 'from-success-400 to-emerald-500', lightBg: 'from-success-50 to-emerald-50' },
    'Warning': { icon: '⚠️', borderColor: 'border-warning-500', bgColor: 'from-warning-400 to-orange-500', lightBg: 'from-warning-50 to-orange-50' },
    'Critical': { icon: '🔴', borderColor: 'border-danger-500', bgColor: 'from-danger-400 to-red-600', lightBg: 'from-danger-50 to-red-50' }
  }

  const status = statusColors[healthStatus.status] || statusColors['Healthy']

  return (
    <>
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        className={`card overflow-hidden border-2 ${status.borderColor} cursor-pointer group`}
      >
        {/* Header Background */}
        <div className={`h-36 bg-gradient-to-br ${status.bgColor} relative overflow-hidden`}>
          {/* Photo or Animated background fallback */}
          {pet.photoURL ? (
             <img src={pet.photoURL} alt={pet.name} className="w-full h-full object-cover mix-blend-overlay opacity-60 scale-105" />
          ) : (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 opacity-20"
            >
              <div className="absolute top-2 right-2 text-5xl">{pet.species === 'Dog' ? '🐕' : '🐈'}</div>
            </motion.div>
          )}
          <div className="absolute inset-0 bg-black/5"></div>

          {/* Status Badge - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-white bg-black/30 backdrop-blur-sm`}
            >
              {status.icon}
            </motion.span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-10 relative z-10">
          {/* Pet Name & Type */}
          <div className="mb-4">
            <div className="inline-block mb-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
              {pet.species}
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{pet.name}</h3>
            <p className="text-sm text-slate-600">{pet.breed}</p>
          </div>

          {/* Stats Row */}
          <div className={`grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-br ${status.lightBg} rounded-lg border border-slate-200/50`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">{petAge.years}y</div>
              <div className="text-xs text-slate-600">age</div>
            </div>
            <div className="border-l border-slate-300/50"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Scale className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">{currentWeight?.value || 'N/A'}</div>
              <div className="text-xs text-slate-600">{currentWeight?.unit || 'kg'}</div>
            </div>
            <div className="border-l border-slate-300/50"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">{healthStatus.issueCount}</div>
              <div className="text-xs text-slate-600">issues</div>
            </div>
          </div>

          {/* Issues Alert */}
          {healthStatus.issueCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-warning-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-700">
                  {healthStatus.issueCount} {healthStatus.issueCount === 1 ? 'Issue' : 'Issues'}
                </span>
              </div>
              <div className="space-y-1.5">
                {healthStatus.issues.slice(0, 2).map((issue, idx) => (
                  <div key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="text-warning-600 font-bold mt-0.5">•</span>
                    <span>{issue.message}</span>
                  </div>
                ))}
                {healthStatus.issueCount > 2 && (
                  <div className="text-xs text-slate-600 font-semibold pt-2">
                    +{healthStatus.issueCount - 2} more issues
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDetail(true)}
              className="flex-1 btn-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <Eye className="w-4 h-4" />
              Details
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQR(true)}
              className="flex-1 btn-secondary inline-flex items-center justify-center gap-2 text-sm"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showQR && <QRCodeModal petID={pet.id} petName={pet.name} onClose={() => setShowQR(false)} />}
      {showDetail && <PetDetailModal pet={pet} healthStatus={healthStatus} onClose={() => setShowDetail(false)} />}
    </>
  )
}

export default PetCard
