import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/login', { email, password })
      const token = response.data.token
      localStorage.setItem('adminToken', token)
      navigate('/dashboard')
    } catch (err) {
      setError('Échec de la connexion. Vérifiez vos identifiants.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-blue-700 uppercase">
            Connexion Admin (Société de Transport)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Espace réservé aux administrateurs de sociétés
          </p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Connexion
        </button>
      </form>
    </div>
  )
}

export default LoginPage
