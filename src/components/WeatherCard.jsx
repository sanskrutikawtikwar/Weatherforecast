function WeatherCard({ date, temperature, windSpeed }) {
  return (
    <div className="weather-card">
      <h3>📅 {date}</h3>

      <p>🌡️ Temperature</p>
      <h2>{temperature}°C</h2>

      <p>💨 Wind Speed</p>
      <h3>{windSpeed} km/h</h3>
    </div>
  )
}

export default WeatherCard