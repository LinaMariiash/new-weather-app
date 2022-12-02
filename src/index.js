let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} </br> ${date} ${month}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  console.log(cityInput.value);
}

let form = document.querySelector("#search-a-city");
form.addEventListener("city", search);

let searchForm = document.querySelector("#search-a-city");
searchForm.addEventListener("submit", search);

//Bonus point
function displayWeatherCond(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  console.log(document.querySelector("#humidity"));
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchTab(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  let city = document.querySelector("#city-input").value;
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${url}&appid${apiKey}`).then(displayWeatherCond);
}

function retrievePosition(position) {
  let apiKey = "1a1c6a43fe9af535f0dca97c61c7d6a7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCond);
  console.log(url);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchFormat = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchTab);

let currentLocationButton = document.querySelector(".location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchTab("Kyiv");
