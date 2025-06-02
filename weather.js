const apiKey = "bc8486a7c22aec0fa12a3a9a349a2d1f"; // Replace this with your real OpenWeatherMap API key

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("getWeatherBtn");
  const cityInput = document.getElementById("cityInput");

  btn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    getWeather(city);
  });
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const weatherData = await response.json();
    updateUI(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Could not fetch weather. Please check the city name and try again.");
  }
}

function updateUI(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("weatherResult").classList.remove("hidden");
}