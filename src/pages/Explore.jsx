import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CountryCard from '../components/CountryCard'

const REGIONS = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania']
const PER_PAGE = 12   

function Explore() {
  const [searchParams] = useSearchParams()  

  const [allCountries, setAllCountries] = useState([])  
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [search, setSearch]             = useState(searchParams.get('q') || '') 
  const [region, setRegion]             = useState('All')
  const [visible, setVisible]           = useState(PER_PAGE)  

  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3,area')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load countries')
        return res.json()
      })
      .then(data => {
        
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setAllCountries(sorted)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])


  useEffect(() => {
    setVisible(PER_PAGE)
  }, [search, region])

 
  const filtered = allCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = region === 'All' || country.region === region
    return matchesSearch && matchesRegion
  })

 
  const displayed = filtered.slice(0, visible)

  return (
    <div className="dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Explore Destinations 🗺️
        </h1>

        {/* ── FILTERS ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search input */}
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-lg outline-none focus:border-blue-400"
          />

          {/* Region dropdown */}
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-lg outline-none"
          >
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Result count */}
        {!loading && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {filtered.length} countries found
          </p>
        )}

        {/* ── STATES ── */}
        {loading && <p className="text-gray-500">Loading countries from API...</p>}
        {error   && <p className="text-red-500">Error: {error}</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-gray-500">No countries found for "{search}"</p>
        )}

        {/* ── CARDS GRID ── */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayed.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}

        {/* ── LOAD MORE BUTTON ── */}
        {visible < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisible(visible + PER_PAGE)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Explore
