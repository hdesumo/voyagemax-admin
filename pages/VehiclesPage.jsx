import { useEffect, useState } from 'react'
import axios from 'axios'

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/vehicles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setVehicles(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des véhicules</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Immatriculation</th>
              <th className="p-2 border">Modèle</th>
              <th className="p-2 border">Nombre de sièges</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="p-2 border">{vehicle.license_plate}</td>
                <td className="p-2 border">{vehicle.model}</td>
                <td className="p-2 border">{vehicle.seats_count}</td>
                <td className="p-2 border">{vehicle.status}</td>
                <td className="p-2 border">
                  {/* Tu pourras ici ajouter modifier ou désactiver */}
                  <button className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default VehiclesPage
