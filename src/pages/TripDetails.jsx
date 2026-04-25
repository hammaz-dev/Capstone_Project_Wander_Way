import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTripContext } from '../context/TripContext'

function TripDetails() {
  const { code } = useParams()    
  const navigate = useNavigate()
  const { saveTrip, removeTrip, isSaved } = useTripContext()

  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const saved = country ? isSaved(country.cca3) : false

 
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Country not found')
        return res.json()
      })
      .then(data => {
        setCountry(data[0])  
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [code])

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>
  if (error)   return <p className="text-center py-20 text-red-500">Error: {error}</p>
  if (!country) return null

  const capital   = country.capital?.[0] || 'N/A'
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
  const currency  = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A'

  return (
    <div className="dark:bg-gray-950 min-h-screen pb-16">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-blue-600 text-sm mb-6 block"
        >
          ← Go Back
        </button>

        {/* Flag */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />

        {/* Country name + save button */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {country.name.common}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{country.name.official}</p>
          </div>

          <button
            onClick={() => saved ? removeTrip(country.cca3) : saveTrip(country)}
            className={`px-5 py-2 rounded-lg font-medium text-sm ${
              saved
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saved ? '❤️ Saved' : '🤍 Save Trip'}
          </button>
        </div>

        {/* Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
            Country Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <InfoRow label="Capital"    value={capital} />
            <InfoRow label="Region"     value={country.region} />
            <InfoRow label="Population" value={country.population?.toLocaleString()} />
            <InfoRow label="Area"       value={`${country.area?.toLocaleString()} km²`} />
            <InfoRow label="Languages"  value={languages} />
            <InfoRow label="Currency"   value={currency} />
            <InfoRow label="Timezone"   value={country.timezones?.[0] || 'N/A'} />
            <InfoRow label="Code"       value={country.cca3} />
          </div>
        </div>

        {/* Google Maps link */}
        {country.maps?.googleMaps && (
          <div className="text-center mt-6">
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        )}

      </div>
    </div>
  )
}

// Small helper component
function InfoRow({ label, value }) {
  return (
    <div>
      <span className="text-gray-400 dark:text-gray-500 text-xs uppercase">{label}</span>
      <p className="text-gray-900 dark:text-white font-medium mt-0.5">{value}</p>
    </div>
  )
}

export default TripDetails
