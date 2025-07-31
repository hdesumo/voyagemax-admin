import { useEffect, useState } from 'react'
import axios from 'axios'

function AgencyProfilePage() {
  const [agencyInfo, setAgencyInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const fetchAgencyProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/agency/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setAgencyInfo(response.data)
    } catch (error) {
      console.error('Erreur chargement profil agence :', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put('https://api.voyagemax.net/agency/update-password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('Mot de passe mis à jour avec succès.')
      setCurrentPassword('')
      setNewPassword('')
    } catch (error) {
      alert('Erreur lors du changement de mot de passe.')
    }
  }

  useEffect(() => {
    fetchAgencyProfile()
  }, [])

  if (loading) return <p>Chargement du profil agence...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profil de l'Agence</h2>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p><strong>Nom Responsable :</strong> {agencyInfo?.managerName}</p>
        <p><strong>Email :</strong> {agencyInfo?.email}</p>
        <p><strong>Téléphone :</strong> {agencyInfo?.phone}</p>
        <p><strong>Nom de l'agence :</strong> {agencyInfo?.agencyName}</p>
        <p><strong>Ville :</strong> {agencyInfo?.city}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Changer le mot de passe</h3>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="border rounded px-3 py-2 mb-4 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default AgencyProfilePage
