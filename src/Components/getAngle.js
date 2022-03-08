async function getAngle(API_KEY, city) {
  const searchBar = document.querySelector(".search-bar");
  searchBar.style.border = ""
  searchBar.placeholder = "New Delhi";
  try {
    const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    if (data.length !== 0) {
      return data;
    }
    else{
      const err = new Error('💣️ boom');
      throw err;
    }

  } catch (err) {
    searchBar.style.border = "1px solid red"
    searchBar.value = "";
    searchBar.placeholder = "City not found";
    console.log("Error occured in getAngle.js " + err);
  }
}

export { getAngle };
