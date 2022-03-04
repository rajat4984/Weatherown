import "./style.css";
import { getAngle } from "./Components/getAngle";
import { getDailyWeather } from "./Components/getDailyWeather";

const API_KEY = "170e7d85c14723782ac20964a574ef47";

const btn = document.querySelector("button");
const input = document.querySelector("input");
const p = document.querySelector(".para")

btn.addEventListener("click", () => {
  let city = input.value;
  let angles = [];

  getAngle(API_KEY, city, angles).then((arr) => {
    let lat = parseInt(arr[0]);
    let long = parseInt(arr[1]);
    getDailyWeather(API_KEY, lat, long).then((weatherData) => {
     let todayWeather = weatherData.daily[0];
     let weeklyWeather = weatherData.daily.splice(1,7)
     p.innerText = `todays temperature is = ${todayWeather.temp.day}
                    weekly weather is ${weeklyWeather}`
    });
  });
});
