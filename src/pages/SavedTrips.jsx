import { useNavigate } from 'react-router-dom'
import { useTripContext } from '../context/TripContext'

function SavedTrips() {
  const navigate = useNavigate()
  const { savedTrips, removeTrip } = useTripContext()


  if (savedTrips.length === 0) {
    return (
      <div className="dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-5xl mb-4">🗺️</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No saved trips yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Click the ❤️ button on any destination to save it here.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Explore Destinations
        </button>
      </div>
    )
  }

  return (
    <div className="dark:bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Saved Trips ❤️
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {savedTrips.length} destination{savedTrips.length > 1 ? 's' : ''} saved
        </p>

        {/* Grid of saved cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map(country => (
            <div
              key={country.cca3}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              {/* Flag */}
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-36 object-cover"
              />

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {country.name.common}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  📍 {country.capital?.[0] || 'N/A'} · {country.region}
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/trip/${country.cca3}`)}
                    className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeTrip(country.cca3)}
                    className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg text-sm hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SavedTrips
