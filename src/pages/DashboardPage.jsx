import React from 'react';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Bienvenue, {user?.fullname || 'Admin'} !</h1>
        <p className="text-gray-700">Ceci est votre tableau de bord administrateur.</p>

        <div className="mt-6">
          <ul className="list-disc list-inside text-gray-600">
            <li>Gérez vos chauffeurs, véhicules et agences</li>
            <li>Consultez les trajets en cours</li>
            <li>Visualisez les réservations des passagers</li>
            <li>Et bien plus à venir...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
