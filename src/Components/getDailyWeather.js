async function getDailyWeather(API_KEY, lat, long) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely&units=metric&appid=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error occured at getDailyWeather.js " + err);
  }
}

export { getDailyWeather };
