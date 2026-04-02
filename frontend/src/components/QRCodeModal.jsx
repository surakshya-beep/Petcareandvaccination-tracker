import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'
import QRCode from 'qrcode.react'

const QRCodeModal = ({ petID, petName, onClose }) => {
  const qrValue = `${window.location.origin}/records/${petID}`

  const handleDownload = () => {
    const element = document.getElementById('qr-code-element')
    const link = document.createElement('a')
    link.href = element.toDataURL('image/png')
    link.download = `${petName}-medical-records.png`
    link.click()
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
          className="card max-w-sm w-full p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="inline-block w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Medical Records</h3>
            <p className="text-slate-600 mb-6">for <span className="font-semibold">{petName}</span></p>

            {/* QR Code */}
            <div className="flex justify-center mb-6 p-6 bg-white border-2 border-slate-200 rounded-xl">
              <QRCode
                id="qr-code-element"
                value={qrValue}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>

            {/* URL */}
            <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 font-mono break-all text-left">
                {qrValue}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QRCodeModal
