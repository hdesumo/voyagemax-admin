import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      </header>

      <section>
        <p className="text-gray-700">Bienvenue dans l’espace de gestion des sociétés de transport.</p>
        {/* Tu pourras ajouter ici la navigation ou des composants spécifiques */}
      </section>
    </div>
  )
}

export default DashboardPage
