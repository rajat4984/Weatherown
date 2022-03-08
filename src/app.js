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
const cityName = document.querySelector(".city-name");
const todayDate = document.querySelector(".today-date");
const today = format(new Date(), "	EEEE d MMMM");
const todayInfo = document.querySelector(".today-info");
const searchBar = document.querySelector(".search-bar");
const searchIcon = document.querySelector(".search-icon");
const toggleSwitch = document.querySelector(".checkbox-container");
const preLoader = document.querySelector("#preloader");

toggleSwitch.addEventListener("click", () => {
  const city = cityName.textContent.split(",")[0];
  getData(API_KEY, city, angles, getUnits());
});

const getUnits = () => {
  if (toggleSwitch.checked) return "imperial";
  else return "metric";
};

// ----------------------EVENT LISTENER ---------------------------------
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  searchBarContainer.classList.toggle("active");
});

searchIcon.addEventListener("click", () => {
  if (searchBar.value.length === 0) return;

  getData(API_KEY, searchBar.value, angles, getUnits());
  hamburger.classList.remove("active");
  searchBarContainer.classList.remove("active");
});

// -----------------------------------FETCH FUNCTIONS-------------------------------------
function getData(API_KEY, city, angles, units) {
  getAngle(API_KEY, city, angles).then((data) => {
    const angleData = data[0];
    const lat = angleData.lat;
    const long = angleData.lon;
    
      getDailyWeather(API_KEY, lat, long, units).then((weatherData) => {
        const todayWeatherArray = weatherData.daily[0];
        const weeklyWeather = weatherData.daily.splice(1, 5);
        const todayTempData = parseInt(weatherData.current.temp);
        const todayTempWordsData = todayWeatherArray.weather[0].main;
        const todayHighData = `${parseInt(todayWeatherArray.temp.max)} &deg;`;
        const todayLowData = `${parseInt(todayWeatherArray.temp.min)} &deg;`;

        const todayWindSpeedData = `${parseInt(
          (todayWeatherArray.wind_speed * 18) / 5
        )}kmph`;
        const todayHumidityData = `${parseInt(todayWeatherArray.humidity)}%`;
        const todaySunriseData = getChangedTime(todayWeatherArray.sunrise);
        const todaySunsetData = getChangedTime(todayWeatherArray.sunset);
        const todayWeatherIconClass = getWeatherIconClass(
          todayWeatherArray.weather[0].id
        );
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

        makeTodaySummary(todaySummaryData, todaySummaryLabels,units); //populates todaySummary elements in html
        makeNextHours(hourlyWeather); //populates next 5 hours element in html
        makeNextDays(weeklyWeather,units);

        todayDate.innerText = today;
        cityName.innerText = `${angleData.name},${angleData.country}`;
        todayInfo.innerHTML = `<h2 class="today-temp"><i class="bi ${todayWeatherIconClass}"></i>${todayTempData}</h2>
      <p class="today-temp-word">${todayTempWordsData}</p>
      `;
        preLoader.style.display = "none";
      })
  })
}

getData(API_KEY, city, angles, getUnits());
