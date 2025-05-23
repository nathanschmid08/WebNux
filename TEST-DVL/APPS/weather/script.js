async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = 'Bitte gib eine Stadt ein.';
        return;
    }

    try {
        // Geocoding: Stadtname in Koordinaten umwandeln
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML = 'Stadt nicht gefunden.';
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Wetterdaten abrufen
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const { temperature, windspeed, weathercode } = weatherData.current_weather;

        weatherResult.innerHTML = `
        <h2>${name}, ${country}</h2>
        <p>🌡️ Temperatur: ${temperature} °C</p>
        <p>💨 Windgeschwindigkeit: ${windspeed} km/h</p>
        <p>🌥️ Wettercode: ${weathercode}</p>
      `;
    } catch (error) {
        weatherResult.innerHTML = 'Fehler beim Abrufen der Wetterdaten.';
        console.error(error);
    }
}
