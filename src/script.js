// Current Date & Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdsay",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let meridiem = hour >= 12 ? "PM" : "AM";
hour = hour % 12;
hour = hour ? hour : 12;
let minutes = String(now.getMinutes()).padStart(2, "0");
let dateFormat = document.querySelector("#date-time");
dateFormat.innerHTML = `${day}, ${hour}:${minutes} ${meridiem}`;
// Update City Name, Temp & Stats

function showWeatherConditions(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  //icon
  let updatedIcon = response.data.weather[0].icon;
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${updatedIcon}@2x.png`
    );

  // humidity
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //wind
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  // sunrise
  let sunrise = response.data.sys.sunrise;
  let newSunriseDate = new Date(sunrise * 1000);
  let hour = newSunriseDate.getHours();
  let meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  let minutes = String(newSunriseDate.getMinutes()).padStart(2, "0");
  document.querySelector(
    "#sunrise"
  ).innerHTML = `${hour}:${minutes} ${meridiem}`;
  //sunset
  let sunset = response.data.sys.sunset;
  let newSunsetDate = new Date(sunset * 1000);
  let sunsetHour = newSunsetDate.getHours();
  let sunsetMeridiem = sunsetHour >= 12 ? "PM" : "AM";
  sunsetHour = sunsetHour % 12;
  sunsetHour = sunsetHour ? sunsetHour : 12;
  let sunsetMinutes = String(newSunsetDate.getMinutes()).padStart(2, "0");
  document.querySelector(
    "#sunset"
  ).innerHTML = `${sunsetHour}:${sunsetMinutes} ${meridiem}`;
}

function updateCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName").value;
  let apiKey = "8f38c157e578682615115dc60e2655cf";
  let prefix = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${prefix}q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}
let city = document.querySelector("#searchCity");
city.addEventListener("submit", updateCity);

let celsiusTemp = null;
let fahrenheitTemp = null;
// Celsius to Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = celsiusTemp;
  // temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Fahrenheint to Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// Current location Weather
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8f38c157e578682615115dc60e2655cf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function updatePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", updatePosition);
