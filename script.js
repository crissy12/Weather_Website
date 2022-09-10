import {API_KEY} from './apikey.js';
document.getElementById('submit-btn').addEventListener("click", myWeatherFunc);    
async function myWeatherFunc(){
    const myData = await myGeoFunc()
    let {lat,lon} = myData[0];
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const weatherData = await response.json();
    document.getElementById('today-location').textContent = weatherData.name
    document.getElementById('today-temp').textContent = Math.round(((1.8 * (parseInt(weatherData.main.temp) -273)) + 32)) + '\xB0'
} 
async function myGeoFunc() {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=`+document.getElementById('txt-input').value+`&limit=1&appid=${API_KEY}`);
    const data = await response.json();
    return data          
} 
