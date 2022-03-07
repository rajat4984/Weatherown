import "./style.css";
import { getAngle } from "./Components/getAngle";
import { getDailyWeather } from "./Components/getDailyWeather";
import { format } from "date-fns";
import {
  makeTodaySummary,
  getChangedTime,
  makeNextHours,
  makeNextDays,
  getWeatherIconClass,
} from "./Components/makeElementFunctions";

const API_KEY = "170e7d85c14723782ac20964a574ef47";
let city = "New Delhi";
let angles = [];

// -----------------DOM ELEMENTS------------------------------------------
const hamburger = document.querySelector(".hamburger");
const searchBarContainer = document.querySelector(".search-bar-container");
const searchIcon = document.querySelector(".search-icon");
const cityName = document.querySelector(".city-name");
const todayDate = document.querySelector(".today-date");
const today = format(new Date(), "	EEEE d MMMM");
todayDate.innerText = today;
const todayInfo = document.querySelector(".today-info");
// ----------------------HAMBURGER MENU FUNCTION---------------------------------
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  searchBarContainer.classList.toggle("active");
});

searchIcon.addEventListener("click", () => {
  hamburger.classList.remove("active");
  searchBarContainer.classList.remove("active");
});

// -----------------------------------FETCH FUNCTIONS-------------------------------------
getAngle(API_KEY, city, angles).then((data) => {
  const angleData = data[0];
  const lat = parseInt(angleData.lat);
  const long = parseInt(angleData.lon);

  getDailyWeather(API_KEY, lat, long).then((weatherData) => {
    const todayWeatherArray = weatherData.daily[0];
    const weeklyWeather = weatherData.daily.splice(1, 5);
    const todayTempData = Math.ceil((weatherData.current.temp));
    const todayTempWordsData = todayWeatherArray.weather[0].main;
    const todayHighData = `${parseInt(todayWeatherArray.temp.max)} &deg;`;
    const todayLowData = `${parseInt(todayWeatherArray.temp.min)} &deg;`;
    const todayWindSpeedData = `${parseInt(
      (todayWeatherArray.wind_speed * 18) / 5
    )}kmph`;
    const todayHumidityData = `${parseInt(todayWeatherArray.humidity)}%`;
    const todaySunriseData = getChangedTime(todayWeatherArray.sunrise);
    const todaySunsetData = getChangedTime(todayWeatherArray.sunset);
    const todayWeatherIconClass = getWeatherIconClass(todayWeatherArray.weather[0].id);
    const todaySummaryData = [
      todayHighData,
      todayWindSpeedData,
      todaySunriseData,
      todayLowData,
      todayHumidityData,
      todaySunsetData,
    ];

    const todaySummaryLabels = [
      "High",
      "Wind",
      "Sunrise",
      "Low",
      "Humidity",
      "Sunset",
    ];
    const hourlyWeather = weatherData.hourly.splice(1, 5);

    makeTodaySummary(todaySummaryData, todaySummaryLabels); //populates todaySummary elements in html
    makeNextHours(hourlyWeather);                           //populates next 5 hours element in html
    makeNextDays(weeklyWeather);
    cityName.innerText = `${angleData.name},${angleData.country}`;
    todayInfo.innerHTML = `<h2 class="today-temp"><i class="bi ${todayWeatherIconClass}"></i>${todayTempData}</h2>
    <p class="today-temp-word">${todayTempWordsData}</p>
    `;
  });
});
