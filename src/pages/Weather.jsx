import { useEffect, useState } from 'react'
import WeatherCard from '../components/WeatherCard'

function Weather() {
  const [city, setCity] = useState('Pune')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError('')

      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      )

      const locationData = await locationResponse.json()

      if (!locationData.results) {
        setError('City not found')
        setWeather(null)
        return
      }

      const { latitude, longitude } = locationData.results[0]

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max&forecast_days=5&timezone=auto`
      )

      const weatherData = await weatherResponse.json()

      setWeather(weatherData)

    } catch (error) {
      console.error(error)
      setError('Unable to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="weather-page">

      <h1>🌤️ Weather Forecast</h1>

      <div className="search-box">

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />

        <button onClick={fetchWeather}>
          Search
        </button>

      </div>

      {loading && <h2>Loading...</h2>}

      {error && <h3 className="error">{error}</h3>}

      {weather && !loading && (
        <>
          <div className="current-weather">

            <h2>Current Weather</h2>

            <h1>
              🌡️ {weather.current.temperature_2m}°C
            </h1>

            <p>
              💨 Wind Speed: {weather.current.wind_speed_10m} km/h
            </p>

          </div>

          <h2>5 Day Forecast</h2>

          <div className="forecast">

            {weather.daily.time.map((date, index) => (
              <WeatherCard
                key={date}
                date={date}
                temperature={
                  weather.daily.temperature_2m_max[index]
                }
                windSpeed={
                  weather.daily.wind_speed_10m_max[index]
                }
              />
            ))}

          </div>
        </>
      )}

    </div>
  )
}

export default Weather