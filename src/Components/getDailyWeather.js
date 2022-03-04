async function getDailyWeather(API_KEY, lat, long) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,hourly,minutely&units=metric&appid=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("Error occured at getDailyWeather.js " + err);
  }
}

export { getDailyWeather };
