document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "00e422c42851c9f4d78ddc7bb48d2b6f"; // ENV VARIABLES

  getWeatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    cityInput.value = "";
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not Found");
      }
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "Network Error!");
    }
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temp: ${main.temp}°c`;
    descriptionDisplay.textContent = weather[0].description;
    // unlock Display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});
