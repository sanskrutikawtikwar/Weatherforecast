import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <h1>🌤️ Weather Forecast App</h1>

      <p>Check the weather of any city.</p>

      <Link to="/weather">
        <button>Check Weather</button>
      </Link>
    </div>
  )
}

export default Home