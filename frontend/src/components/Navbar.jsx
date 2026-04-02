import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Menu, X, Home, Settings, HelpCircle, ShoppingCart } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useCartStore from '../store/cartStore'
import NotificationBell from './NotificationBell'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const cartItems = useCartStore(state => state.cart)

  const isDashboard = location.pathname === '/dashboard'
  const isHome = location.pathname === '/'

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileOpen(false)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center text-lg font-bold text-white group-hover:shadow-lg transition"
            >
              🐾
            </motion.div>
            <span className="text-xl font-bold text-slate-900 hidden md:block">Pet Care</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                {/* Logged In Navigation */}
                <div className="flex items-center gap-6">
                  <Link
                    to="/"
                    className={`font-semibold transition-colors inline-flex items-center gap-2 ${
                      isHome ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`font-semibold transition-colors inline-flex items-center gap-2 ${
                      isDashboard ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🐾 Dashboard
                  </Link>
                  <Link
                    to="/shop"
                    className={`font-semibold transition-colors inline-flex items-center gap-2 ${
                      location.pathname === '/shop' ? 'text-primary-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🛍️ Shop
                  </Link>
                </div>

                {/* Notifications & Profile */}
                <div className="flex items-center gap-4">
                  <Link
                    to="/cart"
                    className="relative p-2 hover:bg-slate-100 rounded-lg transition text-slate-600 hover:text-slate-900"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  <NotificationBell />

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</span>
                    </motion.button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-10"
                      >
                        <div className="p-4 border-b border-slate-200">
                          <p className="font-semibold text-slate-900 truncate" title={user?.name || 'Pet Parent'}>{user?.name || 'Pet Parent'}</p>
                          <p className="text-sm text-slate-600 truncate" title={user?.email || 'user@email.com'}>{user?.email || 'user@email.com'}</p>
                        </div>
                        <div className="py-2">
                          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
                            <HelpCircle className="w-4 h-4" />
                            Help & Support
                          </button>
                        </div>
                        <div className="border-t border-slate-200 p-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className="w-full px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition inline-flex items-center justify-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Not Logged In Navigation */
              <div className="flex items-center gap-4">
                <Link to="/login" className="font-semibold text-slate-600 hover:text-slate-900">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary px-6 py-2">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-3 border-t border-slate-200"
          >
            {isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className={`block px-4 py-2 rounded-lg font-semibold ${
                    isHome ? 'bg-primary-100 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`block px-4 py-2 rounded-lg font-semibold ${
                    isDashboard ? 'bg-primary-100 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  🐾 Dashboard
                </Link>
                <Link
                  to="/shop"
                  className={`block px-4 py-2 rounded-lg font-semibold ${
                    location.pathname === '/shop' ? 'bg-primary-100 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  🛍️ Shop
                </Link>
                <Link
                  to="/cart"
                  className={`block px-4 py-2 rounded-lg font-semibold flex items-center justify-between ${
                    location.pathname === '/cart' ? 'bg-primary-100 text-primary-600' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  🛒 Cart
                  {cartItems.length > 0 && (
                    <span className="bg-danger-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold">
                  ⚙️ Settings
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold">
                  ❓ Help & Support
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition inline-flex items-center justify-center gap-2 mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 rounded-lg font-semibold btn-primary text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
