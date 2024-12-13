const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

const app = express()
const port = 3000

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'))

// Weather API endpoint
app.get('/weather', async (req, res) => {
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ error: 'City is required' })
  }

  const apiKey = process.env.API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  try {
    const response = await axios.get(url)
    const data = response.data

    // Extract needed data
    const weather = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
    }

    res.json(weather)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
