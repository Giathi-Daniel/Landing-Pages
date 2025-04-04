import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Crop from "./pages/Crop"
import Bulk from "./pages/Bulk"
import Convert from "./pages/Convert"
import Watermark from "./pages/Watermark"
import Compress from "./pages/Compress"
import AddText from "./pages/AddText"
import BlackWhite from "./pages/BlackWhite"
import MirrorFlip from "./pages/MirroFlip"
import { Analytics } from "@vercel/analytics/react"

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
        <Route path="/add-text" element={<AddText />} />
        <Route path="/black-white" element={<BlackWhite />} />
        <Route path="/mirror-flip" element={<MirrorFlip />} />
      </Routes>

      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </Router>
  )
}

export default App
