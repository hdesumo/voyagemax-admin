import { Link, useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Véhicules', path: '/vehicles' },
    { name: 'Chauffeurs', path: '/drivers' },
    { name: 'Passagers', path: '/passengers' },
    { name: 'Trajets', path: '/trips' },
    { name: 'Réservations', path: '/bookings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">VoyageMax</h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white font-semibold"
      >
        Se déconnecter
      </button>
    </div>
  )
}

export default Sidebar
