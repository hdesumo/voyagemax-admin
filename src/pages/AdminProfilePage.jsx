// src/pages/AdminProfilePage.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminProfilePage() {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('https://api.voyagemax.net/admin/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setAdmin(response.data)
    } catch (error) {
      console.error('Erreur chargement profil admin', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put('https://api.voyagemax.net/admin/update-password', {
        currentPassword: password,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('Mot de passe mis à jour avec succès')
      setPassword('')
      setNewPassword('')
    } catch (error) {
      alert('Erreur lors de la mise à jour du mot de passe')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <p>Chargement du profil...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profil Administrateur</h2>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p><strong>Nom :</strong> {admin?.fullname}</p>
        <p><strong>Email :</strong> {admin?.email}</p>
        <p><strong>Téléphone :</strong> {admin?.phone}</p>
        <p><strong>Société :</strong> {admin?.company?.name}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Changer le mot de passe</h3>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          className="border rounded px-3 py-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="border rounded px-3 py-2 mb-4 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordChange}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default AdminProfilePage
