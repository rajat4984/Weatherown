function getChangedTime(timeInUnix){
  let date = new Date(timeInUnix * 1000);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  let formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
};

function makeTodaySummary(data, labels) {
  for (let i = 0; i < data.length; i++) {
    const todaySummary = document.querySelector(".today-summary");
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item");
    summaryItem.innerHTML = `   <p class="today-high today-summary-info">${data[i]}</p>
                                <p class="today-high-label today-summary-label">${labels[i]}</p>`;

    todaySummary.appendChild(summaryItem);
  }
}

function makeNextHours(hourlyWeather) {
  const hourlyWeatherCards = document.querySelector(".hourly-weather-cards");
  for (let i = 0; i < hourlyWeather.length; i++) {
    const hourlyWeatherCard = document.createElement("div");
    const time = getChangedTime(hourlyWeather[i].dt);
    const temp = parseInt(hourlyWeather[i].temp);

    hourlyWeatherCard.classList.add("hourly-weather-card");
    hourlyWeatherCard.innerHTML = `<p class="hourly-temp">${temp}&deg;</p>
                                    <i class="bi bi-brightness-high hourly-icon"></i>
                                    <p class="hourly-time">${time}</p>`;

    hourlyWeatherCards.appendChild(hourlyWeatherCard);
  }
}

function makeNextDays(weeklyWeather) {
  const nextWeekCards = document.querySelector(".next-week-cards");
  const weekdayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  for (let i = 0; i < 5; i++) {
    const tommorrow = new Date();
    tommorrow.setDate(tommorrow.getDay()+i)
    const weekDay = tommorrow.getDay();
    console.log(weekDay)
    const weekTemp = parseInt(weeklyWeather[i].temp.day);
    const weekHigh = parseInt(weeklyWeather[i].temp.max);
    const weekLow = parseInt(weeklyWeather[i].temp.min);
    const weekWind = `${parseInt((weeklyWeather[i].wind_speed * 18) / 5)}kmph`;
    const weekHumidity = `${parseInt(weeklyWeather[i].humidity)}%`;
    const nextWeekCard = document.createElement("div");

    nextWeekCard.innerHTML = `<div class="next-week-card-item">
    <p class="week-card-day">${weekdayArray[weekDay]}</p>
    <p class="week-card-day-label">${weekTemp} &deg;</p>
    </div>
    <i class="bi bi-brightness-high hourly-icon"></i>
    <div class="next-week-card-item">
    <p class="week-card-high">${weekHigh} &deg;</p>
    <p class="week-card-high-label">High</p>
    </div>
    <div class="next-week-card-item">
    <p class="week-card-low">${weekLow} &deg;</p>
    <p class="week-card-low-label">Low</p>
    </div>
    <div class="next-week-card-item">
    <p class="week-card-wind">${weekWind}</p>
    <p class="week-card-wind-label">Wind</p>
    </div>
    <div class="next-week-card-item">
    <p class="week-card-humidity">${weekHumidity}</p>
    <p class="week-card-humidity-label">Humidity</p>
    </div>`;

    nextWeekCard.classList.add("next-week-card");
    nextWeekCards.appendChild(nextWeekCard);
  }
}

export { makeTodaySummary, getChangedTime, makeNextHours, makeNextDays };
