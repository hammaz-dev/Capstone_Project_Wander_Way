import { createContext, useContext, useState, useEffect } from 'react'


const TripContext = createContext()


export function TripProvider({ children }) {

 
  const [savedTrips, setSavedTrips] = useState(() => {
    const data = localStorage.getItem('savedTrips')
    return data ? JSON.parse(data) : []   
  })

  
  const [darkMode, setDarkMode] = useState(false)

  
  useEffect(() => {
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips))
  }, [savedTrips])

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

 
  function saveTrip(country) {
    // Don't add duplicates
    const alreadySaved = savedTrips.find(t => t.cca3 === country.cca3)
    if (!alreadySaved) {
      setSavedTrips([...savedTrips, country])
    }
  }

 
  function removeTrip(code) {
    setSavedTrips(savedTrips.filter(t => t.cca3 !== code))
  }

 
  function isSaved(code) {
    return savedTrips.some(t => t.cca3 === code)
  }

  return (
    <TripContext.Provider value={{ savedTrips, saveTrip, removeTrip, isSaved, darkMode, setDarkMode }}>
      {children}
    </TripContext.Provider>
  )
}


export function useTripContext() {
  return useContext(TripContext)
}
