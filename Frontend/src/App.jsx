// Add Route to the named imports and use BrowserRouter for web apps
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/pages/Login'

function App() {
  return (
    <>

      <Routes>
        {/* Route is now defined and available for use */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  )
}

export default App