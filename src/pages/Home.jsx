import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryCard from '../components/CountryCard'

const FEATURED = ['IND', 'FRA', 'JPN', 'AUS', 'ITA', 'BRA']

function Home() {
  const navigate = useNavigate()

  const [countries, setCountries] = useState([])   
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [search, setSearch]       = useState('')    

  
  useEffect(() => {
   
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3,area')
      .then(res => {
        if (!res.ok) throw new Error('Could not load countries')
        return res.json()
      })
      .then(data => {
       
        const featured = data.filter(c => FEATURED.includes(c.cca3))
        setCountries(featured)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])  

 
  function handleSearch(e) {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/explore?q=${search}`)
    }
  }

  return (
    <div className="dark:bg-gray-950 min-h-screen">

      {/* ── HERO SECTION ── */}
      <div className="bg-blue-600 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-3">Explore the World 🌏</h1>
        <p className="text-blue-100 mb-8 text-lg">Find your next destination and plan your trip</p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex justify-center gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search a country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50"
          >
            Search
          </button>
        </form>
      </div>

      {/* ── FEATURED DESTINATIONS ── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Popular Destinations
        </h2>

        {/* Loading state */}
        {loading && <p className="text-gray-500">Loading destinations...</p>}

        {/* Error state */}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Cards grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}

        {/* Explore all button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Explore All Destinations →
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home
