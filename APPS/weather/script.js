async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = 'Please enter a city.';
        return;
    }

    try {
        // Geocoding: Stadtname in Koordinaten umwandeln
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML = 'City not found.';
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Wetterdaten abrufen
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const { temperature, windspeed, weathercode } = weatherData.current_weather;
        const weatherImage = getWeatherImage(weathercode);

        weatherResult.innerHTML = `
        <h2>${name}, ${country}</h2>
        <p>
            <img src="weather/temperature.png" alt="Temperatur" style="width: 20px; vertical-align: middle; margin-right: 8px;">
            Temperatur: ${temperature} °C
        </p>
        <p>
            <img src="weather/wind.png" alt="Wind" style="width: 20px; vertical-align: middle; margin-right: 8px;">
            Windgeschwindigkeit: ${windspeed} km/h
        </p>
        <img src="weather/${weatherImage}" alt="Wetterbild" style="width: 100px; height: auto;">
    `;
    
    } catch (error) {
        weatherResult.innerHTML = 'Error with the API call.';
        console.error(error);
    }
}

function getWeatherImage(code) {
    if (code === 0) return 'sun.png';
    if ([1, 2, 3].includes(code)) return 'sun-cloudy-rain.png'; 
    if ([61, 63, 65, 80, 81, 82].includes(code)) return 'rain-soft.png';
    if ([66, 67, 95].includes(code)) return 'rain-thunder.png'; 
    if ([96, 99].includes(code)) return 'rain-hard.png'; 
    if ([51, 53, 55].includes(code)) return 'rain-soft.png'; 

    return 'sun-cloudy-rain.png'; 
}
