import {API_KEY} from './apikey.js';
document.getElementById('submit-btn').addEventListener("click", myWeatherFunc);    


function currentTime(){
    let time = new Date();
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let todaysTime = `${month}/${day}/${year}`
    return todaysTime;
}
document.getElementById('today-date').textContent = currentTime();


// Function to get geolocation data on the entered city name
function myGeoFunc() {
    // Ties the fetch result to the constant res
    const res = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=`+document.getElementById('txt-input').value+`&limit=1&appid=${API_KEY}`)
        // Check if the response to the API call is not ok and throws an error, otherwise returns another promise
        .then((response) => { 
            if (!response.ok) { throw new Error ("Network response gave an error") }
            // returns the promise for the json object from the API call
            return response.json();
        })
    // returns the promise
    return res;           
}

async function myWeatherFunc(){
    // It waits for the promise to resolve and assigns value to myData
    const myData = await myGeoFunc();
    let {lat,lon} = myData[0];
    // Does a async call to the fetch API to get weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    // Waits for weather promise to resolve and assigns weather data to the weatherData const
    const weatherData = await response.json();
    // Uses weatherData const to change values in the HTML doc
    document.getElementById('today-location').textContent = weatherData.name + ' , ' + weatherData.sys.country;
    document.getElementById('today-temp').textContent = Math.round(((1.8 * (parseInt(weatherData.main.temp) -273)) + 32)) + '\xB0';
    document.getElementById('today-weather-icon').src=`/assets/${weatherData.weather[0].icon}.png`;
    document.getElementById('weather-txt').innerHTML = 'Weather for your estimated location, ' + weatherData.name;
} 






// *****************************************************************
// Another way of doing this
// async function myGeoFunc() {
//     // Ties the fetch result to the constant res
//     const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=`+document.getElementById('txt-input').value+`&limit=1&appid=${API_KEY}`)
//         // Check if the response to the API call is not ok and throws an error, otherwise returns another promise(not cash money)
//     if (!res.ok) { throw new Error ("Network response gave an error") }
//     console.log(res); 
//     return res.json();