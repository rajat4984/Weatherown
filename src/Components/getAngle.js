async function getAngle(API_KEY,city,angles){
    try{
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=${API_KEY}`
        let response = await fetch(url,{mode:"cors"})
        let data = await response.json()
        angles.push(data[0].lat,data[0].lon)
        return angles;
    }
    catch(err){
        console.log("Error occured in getAngle.js " + err)
    }
   
    // console.log()


}

export {getAngle}