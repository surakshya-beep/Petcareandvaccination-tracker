import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Shield, Zap, Stethoscope, Calendar, TrendingUp, Users, CheckCircle, Clock, FileText, QrCode, ChevronDown, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LandingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const features = [
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: 'Track vaccinations, checkups, and health metrics in one centralized place.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Smart Reminders',
      description: 'AI-powered notifications ensure you never miss an appointment or vaccination.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Bank-grade encryption keeps your pet\'s medical data safe and private.',
      color: 'from-primary-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'QR Sharing',
      description: 'Share medical records with vets instantly using unique QR codes.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Health Analytics',
      description: 'Visualize your pet\'s health trends and weight history over time.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Multi-Pet Support',
      description: 'Manage all your pets in one dashboard with individual profiles.',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up in seconds with your email address.'
    },
    {
      number: '02',
      title: 'Add Your Pets',
      description: 'Enter basic information about each of your furry friends.'
    },
    {
      number: '03',
      title: 'Track Health',
      description: 'Log vaccinations, checkups, and medications easily.'
    },
    {
      number: '04',
      title: 'Get Reminders',
      description: 'Receive notifications for upcoming appointments.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Dog Parent',
      image: '👩',
      text: 'Pet Care Tracker saved me from missing my golden retriever\'s vaccination. The reminders are a lifesaver!'
    },
    {
      name: 'Mike Chen',
      role: 'Cat Lover',
      image: '👨',
      text: 'Finally, a simple way to keep all my cats\' medical records organized. The QR code feature is amazing!'
    },
    {
      name: 'Emma Wilson',
      role: 'Veterinarian',
      image: '👩‍⚕️',
      text: 'My clients love using this platform. It makes consultations so much more efficient.'
    }
  ]

  const faqs = [
    {
      question: 'Is my pet\'s data really secure?',
      answer: 'Yes! We use industry-standard AES-256 encryption to protect all medical records. Your data is backed up daily and complies with international privacy standards.'
    },
    {
      question: 'Can I use this for multiple pets?',
      answer: 'Absolutely! You can add and manage unlimited pets in a single account with individual profiles and health timelines.'
    },
    {
      question: 'How do I share records with my vet?',
      answer: 'Simply generate a unique QR code for your pet. Your vet can scan it to access the medical records you\'ve shared.'
    },
    {
      question: 'What if I need help?',
      answer: 'Our support team is available 24/7 via chat, email, and phone. We also have an extensive knowledge base and video tutorials.'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Pet Parents', icon: '👥' },
    { number: '150K+', label: 'Pets Tracked', icon: '🐾' },
    { number: '98%', label: 'Satisfaction', icon: '⭐' },
    { number: '24/7', label: 'Support', icon: '🛟' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="badge bg-primary-100 text-primary-700">
                    ✨ Welcome to Pet Care Tracker
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Your Pet's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Health Guardian</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Keep track of your pet's wellness with our intelligent health management platform. From vaccinations to vet appointments, we've got you covered.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link to="/signup" className="btn-primary inline-flex items-center gap-2 group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </Link>
                  <Link to="/login" className="btn-secondary inline-flex items-center gap-2">
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative card p-8">
                  <img src="https://cdn-icons-png.flaticon.com/512/3047/3047928.png" alt="Happy Pet" className="w-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features for Pet Parents
            </h2>
            <p className="text-xl text-slate-600">Everything you need to keep your pets healthy and happy</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div key={idx} variants={itemVariants} className="card p-8 hover:shadow-xl transition">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Care for Your Pet Better?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of pet parents who trust Pet Care Tracker with their furry friends.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-50 transition-all group">
            Start Free Trial Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
