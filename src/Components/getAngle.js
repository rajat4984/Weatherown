async function getAngle(API_KEY, city) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error occured in getAngle.js " + err);
  }
}

export { getAngle };
