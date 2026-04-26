import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import Navbar      from './components/Navbar'
import Home        from './pages/Home'
import Explore     from './pages/Explore'
import TripDetails from './pages/TripDetails'
import SavedTrips  from './pages/SavedTrips'

function App() {
  return (
    
    <TripProvider>
      <BrowserRouter>
        {/* Navbar always shows at the top */}
        <Navbar />

        {/* Routes decide which page to show based on the URL */}
        <Routes>
          <Route path="/"           element={<Home />}        />
          <Route path="/explore"    element={<Explore />}     />
          <Route path="/trip/:code" element={<TripDetails />} />
          <Route path="/saved"      element={<SavedTrips />}  />
        </Routes>
      </BrowserRouter>
      
    </TripProvider>
  )
}

export default App
