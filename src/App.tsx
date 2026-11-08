import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VillasPage from './pages/VillasPage'
import AmenitiesPage from './pages/AmenitiesPage'
import LocationPage from './pages/LocationPage'
import ContactPage from './pages/ContactPage'
import ResidentHubPage from './pages/ResidentHubPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/villas" element={<VillasPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/inquire" element={<Navigate to="/contact" replace />} />
        <Route path="/resident" element={<ResidentHubPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
