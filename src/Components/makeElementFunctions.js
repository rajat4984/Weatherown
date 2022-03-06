const getChangedTime = (timeInUnix) => {
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

export { makeTodaySummary, getChangedTime, makeNextHours };
