async function getWeather() {
  const city = document.getElementById('city').value

  if (!city) {
    alert('Please enter a city name!')
    return
  }

  const response = await fetch(`/weather?city=${city}`)
  const data = await response.json()

  if (data.error) {
    alert(data.error)
  } else {
    document.getElementById('temp').textContent = `${data.temperature}°C`
    document.getElementById('desc').textContent =
      data.description.charAt(0).toUpperCase() + data.description.slice(1)
    document.getElementById(
      'locationName'
    ).textContent = `${data.city}, ${data.country}`
  }
}
