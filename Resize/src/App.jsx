import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Crop from "./pages/Crop"
import Bulk from "./pages/Bulk"
import Convert from "./pages/Convert"
import Watermark from "./pages/Watermark"
import Features from "./pages/Features"
import Compress from "./pages/Compress"

function App() {

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/bulk" element={<Bulk />} />
        <Route path="/compress" element={<Compress />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/watermark" element={<Watermark />} />
        <Route path="/features" element={<Features />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
