import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isBefore } from 'date-fns';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/vehicles`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules:', error);
      }
    };

    fetchVehicles();
  }, []);

  const isExpired = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return isBefore(date, today);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Liste des véhicules</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Immatriculation</th>
              <th className="border px-4 py-2">Modèle</th>
              <th className="border px-4 py-2">Nombre de places</th>
              <th className="border px-4 py-2">Visite technique</th>
              <th className="border px-4 py-2">Assurance</th>
              <th className="border px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td className="border px-4 py-2">{vehicle.license_plate}</td>
                <td className="border px-4 py-2">{vehicle.model}</td>
                <td className="border px-4 py-2">{vehicle.seats_count}</td>
                <td className="border px-4 py-2 flex items-center gap-1">
                  {vehicle.technicalInspectionExpiry
                    ? format(new Date(vehicle.technicalInspectionExpiry), 'dd/MM/yyyy')
                    : '—'}
                  {vehicle.technicalInspectionExpiry && isExpired(vehicle.technicalInspectionExpiry) && (
                    <FaExclamationTriangle className="text-red-600 ml-2" title="Visite technique expirée" />
                  )}
                </td>
                <td className="border px-4 py-2 flex items-center gap-1">
                  {vehicle.insuranceExpiry
                    ? format(new Date(vehicle.insuranceExpiry), 'dd/MM/yyyy')
                    : '—'}
                  {vehicle.insuranceExpiry && isExpired(vehicle.insuranceExpiry) && (
                    <FaExclamationTriangle className="text-red-600 ml-2" title="Assurance expirée" />
                  )}
                </td>
                <td className="border px-4 py-2 capitalize">{vehicle.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
