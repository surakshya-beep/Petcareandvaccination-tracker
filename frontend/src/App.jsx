import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import NotificationsPage from './pages/NotificationsPage'
import SchedulePage from './pages/SchedulePage'
import HealthCheckPage from './pages/HealthCheckPage'
import MedicalHistoryPage from './pages/MedicalHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
        
        {/* Home Route - Changes based on auth status */}
        <Route path="/" element={isLoggedIn ? <HomePage /> : <LandingPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/health-check" element={isLoggedIn ? <HealthCheckPage /> : <Navigate to="/login" />} />
        <Route path="/medical-history" element={isLoggedIn ? <MedicalHistoryPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isLoggedIn ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/schedule" element={isLoggedIn ? <SchedulePage /> : <Navigate to="/login" />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

