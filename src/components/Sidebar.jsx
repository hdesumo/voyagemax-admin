// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const links = [
    { to: '/dashboard', label: 'Tableau de bord' },
    { to: '/vehicles', label: 'Véhicules' },
    { to: '/drivers', label: 'Chauffeurs' },
    { to: '/passengers', label: 'Passagers' },
    { to: '/trips', label: 'Trajets' },
    { to: '/bookings', label: 'Réservations' },
    { to: '/admin-profile', label: 'Profil' },
  ];

  return (
    <aside className="bg-blue-800 text-white w-64 min-h-screen p-6 fixed">
      <h2 className="text-2xl font-bold mb-8">VoyageMax Admin</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'text-yellow-300 font-semibold' : 'text-white'
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
        >
          Déconnexion
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
