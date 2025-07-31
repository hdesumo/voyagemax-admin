import { useEffect, useState } from 'react'
import axios from 'axios'

function SuperAdminProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const token = localStorage.getItem('superAdminToken')

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://api.voyagemax.net/superadmin/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProfile(response.data)
    } catch (err) {
      console.error('Erreur chargement profil SuperAdmin:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    try {
      await axios.put('https://api.voyagemax.net/superadmin/update-password', {
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
      alert('Erreur lors de la mise à jour du mot de passe.')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <p>Chargement du profil SuperAdmin...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profil SuperAdmin</h2>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p><strong>Nom :</strong> {profile?.fullName}</p>
        <p><strong>Email :</strong> {profile?.email}</p>
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
          onClick={handleChangePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default SuperAdminProfilePage
