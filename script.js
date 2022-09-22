import {API_KEY} from './apikey.js';

document.getElementById('submit-btn').addEventListener("click", myWeatherFunc);    
let time = new Date();

function currentTime(){
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let todaysTime = `${month}/${day}/${year}`
    return todaysTime;
}
document.getElementById('today-date').textContent = currentTime();

function getFutureDay(num){
    const weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    if (num !== undefined)
    {
        let today = time.getDay();
        if(today + num >=7)
        {
            num = (today + num) - 7
            today = 0 + num;
        }
        else{
            today += num;
        }
        return weekdays[today];
    }
    else {
        return 'Error'
    }
}

function getDayandMonth(num){
    const months = new Array(12);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "Sept";
    months[9] = "October";
    months[10] = "Nov";
    months[11] = "Dec";

    let Day = time.getDate() + num;
    let value = Day +' '+ months[time.getMonth()];
    return value;
}



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
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`);
    // Waits for weather promise to resolve and assigns weather data to the weatherData const
    const weatherData = await response.json();
    console.log(weatherData);
    // Uses weatherData const to change values in the HTML doc
    document.getElementById('today-location').textContent = weatherData.timezone;
    document.getElementById('today-temp').textContent = Math.round(((1.8 * (parseInt(weatherData.current.temp) -273)) + 32)) + '\xB0';
    document.getElementById('today-weather-icon').src=`/assets/${weatherData.current.weather[0].icon}.png`;
    document.getElementById('weather-txt').innerHTML = 'Weather for your estimated location, ' + document.getElementById('txt-input').value;

    let container = document.getElementsByClassName('date')
    for (let x = 0; x < container.length; x++){
        if(x == 0){
            container[x].innerHTML = '<span style="white-space: pre-line">Tomorrow\n' + getDayandMonth(x+1) + ' </span>';
        }
        else{
            container[x].innerHTML = '<span style="white-space: pre-line">' + getFutureDay(x+1) + '\n' + getDayandMonth(x+1) + '</span>';
    }

} 
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