import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Episodes from './pages/Episodes/Episodes'
import Locations from './pages/Locations/Locations'
import CharacterDetailsPage from './pages/CharacterDetailPage/CharacterDetailPage'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/episodes" element={<Episodes />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route
                        path="/character/:id"
                        element={<CharacterDetailsPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
