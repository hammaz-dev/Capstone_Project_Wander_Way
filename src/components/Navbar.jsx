// ─────────────────────────────────────────────
// components/Navbar.jsx
// Top bar shown on every page.
// Has navigation links and dark mode toggle.
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { useTripContext } from '../context/TripContext'

function Navbar() {
  const { darkMode, setDarkMode, savedTrips } = useTripContext()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-blue-600 font-bold text-xl">
        🌍 WanderWay
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium">
          Home
        </Link>
        <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium">
          Explore
        </Link>
        <Link to="/saved" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-medium">
          Saved ({savedTrips.length})
        </Link>

        {/* Dark mode button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
