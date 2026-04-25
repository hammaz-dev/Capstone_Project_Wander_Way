import { Link } from 'react-router-dom'
import { useTripContext } from '../context/TripContext'

function CountryCard({ country }) {
  const { saveTrip, removeTrip, isSaved } = useTripContext()

  const saved = isSaved(country.cca3)
  const capital = country.capital?.[0] || 'N/A'

  
  function handleHeartClick(e) {
    e.preventDefault()  
    if (saved) {
      removeTrip(country.cca3)
    } else {
      saveTrip(country)
    }
  }

  return (
    <Link to={`/trip/${country.cca3}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Flag image */}
        <div className="relative">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full h-40 object-cover"
          />

          {/* Heart / save button */}
          <button
            onClick={handleHeartClick}
            className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Card info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base">
            {country.name.common}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">📍 {capital}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">🌐 {country.region}</p>
          <p className="text-blue-600 font-medium text-sm mt-2">View Details →</p>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
