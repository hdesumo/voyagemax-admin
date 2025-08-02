import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AgencyProfilePage from './pages/AgencyProfilePage';
import SuperAdminProfilePage from './pages/SuperAdminProfilePage';
import VehiclesPage from './pages/VehiclesPage';
import DriversPage from './pages/DriversPage';
import PassengersPage from './pages/PassengersPage';
import TripsPage from './pages/TripsPage';
import BookingsPage from './pages/BookingsPage';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute role="admin"><Layout><DashboardPage /></Layout></ProtectedRoute>} />
      <Route path="/admin-profile" element={<ProtectedRoute role="admin"><Layout><AdminProfilePage /></Layout></ProtectedRoute>} />
      <Route path="/agency-profile" element={<ProtectedRoute role="admin"><Layout><AgencyProfilePage /></Layout></ProtectedRoute>} />
      <Route path="/superadmin-profile" element={<ProtectedRoute role="superadmin"><Layout><SuperAdminProfilePage /></Layout></ProtectedRoute>} />
      <Route path="/vehicles" element={<ProtectedRoute role="admin"><Layout><VehiclesPage /></Layout></ProtectedRoute>} />
      <Route path="/drivers" element={<ProtectedRoute role="admin"><Layout><DriversPage /></Layout></ProtectedRoute>} />
      <Route path="/passengers" element={<ProtectedRoute role="admin"><Layout><PassengersPage /></Layout></ProtectedRoute>} />
      <Route path="/trips" element={<ProtectedRoute role="admin"><Layout><TripsPage /></Layout></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute role="admin"><Layout><BookingsPage /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;