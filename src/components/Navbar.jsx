import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🌤️ Weather App</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/weather">Weather</Link>
      </div>
    </nav>
  )
}

export default Navbar