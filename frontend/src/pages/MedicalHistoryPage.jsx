import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PetMedicalHistory from '../components/PetMedicalHistory'
import mockPets from '../data/mockPets'
import { Book, ChevronDown } from 'lucide-react'

const MedicalHistoryPage = () => {
  const [selectedPetId, setSelectedPetId] = useState(mockPets[0]?.id || 1)
  const selectedPet = mockPets.find(p => p.id === selectedPetId)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded"></div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Medical History</h1>
            </div>
            <p className="text-xl text-slate-600 ml-4">Track illnesses, prescriptions, vet visits, and weight monitoring</p>
          </motion.div>

          {/* Pet Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8"
          >
            <label className="block text-sm font-semibold text-slate-900 mb-4">
              📋 Select a Pet to View Medical History
            </label>
            <div className="relative">
              <select
                value={selectedPetId}
                onChange={(e) => setSelectedPetId(Number(e.target.value))}
                className="w-full px-4 py-3 appearance-none bg-white border border-slate-300 rounded-lg font-medium text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              >
                {mockPets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.petEmoji || '🐾'} {pet.name} - {pet.breed}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </motion.div>

          {/* Medical History Component */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {selectedPet && <PetMedicalHistory pet={selectedPet} />}
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 mt-12"
          >
            <div className="flex items-start gap-4">
              <Book className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">📝 Medical Records Tips</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ Keep track of all medications prescribed by your veterinarian</li>
                  <li>✓ Regular weight monitoring helps identify health changes early</li>
                  <li>✓ Document all vet visits and their outcomes for future reference</li>
                  <li>✓ Note any illnesses and their treatments for pattern identification</li>
                  <li>✓ Share this history with new veterinarians for comprehensive care</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MedicalHistoryPage
