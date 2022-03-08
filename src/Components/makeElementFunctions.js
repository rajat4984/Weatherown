function getWeatherIconClass(weatherId) {
  let weatherIconClass = "";
  if (weatherId >= 200 && weatherId <= 232) {
    weatherIconClass = "bi-cloud-lightning-rain";
  } else if (weatherId >= 300 && weatherId <= 321) {
    weatherIconClass = "bi-cloud-drizzle";
  } else if (weatherId >= 500 && weatherId <= 531) {
    weatherIconClass = "bi-cloud-rain-heavy";
  } else if (weatherId >= 600 && weatherId <= 622) {
    weatherIconClass = "bi-cloud-snow";
  } else if (weatherId >= 701 && weatherId <= 781) {
    weatherIconClass = "bi-wind";
  } else if (weatherId === 800) {
    weatherIconClass = "bi-brightness-high";
  } else if (weatherId >= 801 && weatherId <= 804) {
    weatherIconClass = "bi-cloud-sun";
  }
  return weatherIconClass;
}

function getChangedTime(timeInUnix) {
  let date = new Date(timeInUnix * 1000);
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  let formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}

function makeTodaySummary(data, labels,units) {
  const todaySummary = document.querySelector(".today-summary");
  let speedTag = "mph";
  if (units === "imperial") {
    let splittedData = data[1].split("k")
    data[1] = splittedData[0] + splittedData[1]
  } else {
    speedTag = "kmph"
  }
  todaySummary.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const summaryItem = document.createElement("div");
    summaryItem.classList.add("summary-item");
    summaryItem.innerHTML = `   <p class="today-high today-summary-info">${data[i]}</p>
                                <p class="today-high-label today-summary-label">${labels[i]}</p>`;

    todaySummary.appendChild(summaryItem);
  }
}

function makeNextHours(hourlyWeather) {
  const hourlyWeatherCards = document.querySelector(".hourly-weather-cards");
  hourlyWeatherCards.innerHTML = "";
  for (let i = 0; i < hourlyWeather.length; i++) {
    const hourlyWeatherCard = document.createElement("div");
    const time = getChangedTime(hourlyWeather[i].dt);
    const temp = parseInt(hourlyWeather[i].temp);
    const weatherIconClass = getWeatherIconClass(
      hourlyWeather[i].weather[0].id
    );

    hourlyWeatherCard.classList.add("hourly-weather-card");
    hourlyWeatherCard.innerHTML = `<p class="hourly-temp">${temp}&deg;</p>
                                    <i class="bi ${weatherIconClass} hourly-icon"></i>
                                    <p class="hourly-time">${time}</p>`;

    hourlyWeatherCards.appendChild(hourlyWeatherCard);
  }
}

function makeNextDays(weeklyWeather,units) {
  const nextWeekCards = document.querySelector(".next-week-cards");
  nextWeekCards.innerHTML = "";
  const weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 5; i++) {
    const tommorrow = new Date();
    tommorrow.setDate(tommorrow.getDay() + i);
    const weekDay = tommorrow.getDay();
    const weekTemp = parseInt(weeklyWeather[i].temp.day);
    const weekHigh = parseInt(weeklyWeather[i].temp.max);
    const weekLow = parseInt(weeklyWeather[i].temp.min);
    const weekWind = `${parseInt((weeklyWeather[i].wind_speed * 18) / 5)}`;
    const weekHumidity = `${parseInt(weeklyWeather[i].humidity)}%`;
    const nextWeekCard = document.createElement("div");
    const weatherIconClass = getWeatherIconClass(
      weeklyWeather[i].weather[0].id
    );
    let speedTag;
    units == "imperial"?speedTag = "mph" :speedTag = "kmph"

    nextWeekCard.innerHTML = `<div class="next-week-card-item">
    <p class="week-card-day">${weekdayArray[weekDay]}</p>
    <p class="week-card-day-label">${weekTemp} &deg;</p>
    </div>
    <i class="bi ${weatherIconClass} hourly-icon"></i>
    <div class="next-week-card-item">
    <p class="week-card-high">${weekHigh} &deg;</p>
    <p class="week-card-high-label">High</p>
    </div>
    <div class="next-week-card-item">
    <p class="week-card-low">${weekLow} &deg;</p>
    <p class="week-card-low-label">Low</p>
    </div>
    <div class="next-week-card-item">
    <p class="week-card-wind">${weekWind}${speedTag}</p>
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

export {
  makeTodaySummary,
  getChangedTime,
  makeNextHours,
  makeNextDays,
  getWeatherIconClass,
};
