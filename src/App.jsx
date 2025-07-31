import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import AdminProfilePage from './pages/AdminProfilePage'
import SuperAdminProfilePage from './pages/SuperAdminProfilePage'
import AgencyProfilePage from './pages/AgencyProfilePage'
import SuperAdminProfilePage from './pages/SuperAdminProfilePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import VehiclesPage from './pages/VehiclesPage'
import DriversPage from './pages/DriversPage'
import PassengersPage from './pages/PassengersPage'
import TripsPage from './pages/TripsPage'
import BookingsPage from './pages/BookingsPage'

import Sidebar from './components/Sidebar'

function App() {
  const isAuthenticated = localStorage.getItem('adminToken') !== null
  const location = useLocation()

  // Rediriger vers /login si non authentifié sur les routes protégées
  useEffect(() => {
    if (
      !isAuthenticated &&
      location.pathname !== '/login'
    ) {
      window.location.href = '/login'
    }
  }, [isAuthenticated, location.pathname])

  // Layout avec sidebar uniquement si connecté
  const ProtectedLayout = ({ children }) => (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-6">{children}</main>
    </div>
  )

  return (
    
    <Routes>
      {/* Page de connexion */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes protégées avec sidebar */}
      <Route
  path="/admin-profile"
  element={isAuthenticated ? <AdminProfilePage /> : <Navigate to="/login" />}
/>
    <Route
  path="/agency-profile"
  element={isAuthenticated ? <AgencyProfilePage /> : <Navigate to="/login" />}
/>
    <Route
  path="/superadmin-profile"
  element={isAuthenticated ? <SuperAdminProfilePage /> : <Navigate to="/login" />}
/>
    <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    <Route
        path="/vehicles"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <VehiclesPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    <Route
        path="/drivers"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <DriversPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    <Route
        path="/passengers"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <PassengersPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    
    <Route
  path="/superadmin/profile"
  element={
    localStorage.getItem('superAdminToken') !== null
      ? <SuperAdminProfilePage />
      : <Navigate to="/login" />
  }
/>

    <Route
        path="/trips"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <TripsPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    <Route
        path="/bookings"
        element={
          isAuthenticated ? (
            <ProtectedLayout>
              <BookingsPage />
            </ProtectedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Redirection vers dashboard si route inconnue */}
    <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App
