const url_base = 'https://api.open-meteo.com/v1/forecast?'
const url_temp = '&current=temperature_2m&timezone=auto'
const url_rain = '&current=rain&timezone=auto'

let latitude;
let longitude;
const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city")
const message1 = document.getElementById("city-output")
const message2 = document.getElementById("weather_output");

async function getCoordinates(city){
    try{
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
       
        const data = await response.json();

        if (!data.results || data.results.length === 0){
            latitude = undefined;
            longitude = undefined;
            return false;
        } else {
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
                
            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);
            return true
        }
    }
    catch(error){
        console.error('Error:', error);
        message1.innerText = "Something went wrong. Try again";
    }
}

cityForm.addEventListener('submit', async function (event){
    event.preventDefault();
    message1.innerText = "";
    message2.innerText = "";
    const cityName = cityInput.value;
    const cityFound = await getCoordinates(cityName);
    
    if (cityFound){
        message1.innerText = "City found";
        
    } else {message1.innerText = "City wasn't found. Try again";}
})


async function getTemperature() {
    try{
        if (!latitude || !longitude){
            message2.innerText = "Please search for a city first";
            return;
        }
        const response = await fetch (`${url_base}latitude=${latitude}&longitude=${longitude}${url_temp}`)
        if (!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        const temperature = data.current.temperature_2m;

        message2.innerText = `Temperature: ${temperature} °C`;
    }
    catch (error){
        console.error('Error:', error);
        message2.innerText = "Not able to get weather data";
    }
}

const tempBtn = document.getElementById("temp-btn");

tempBtn.addEventListener("click", function(event){
    getTemperature();
})


async function getRain() {
    try{
        if (!latitude || !longitude){
            message2.innerText = "Please search for a city first";
            return;
        }
        const response = await fetch (`${url_base}latitude=${latitude}&longitude=${longitude}${url_rain}`);
        if (!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        const rain = data.current.rain;

        message2.innerText = `Rain: ${rain} mm`;
    }
    catch (error){
        console.error('Error:', error);
        message2.innerText = "Not able to get weather data";
    }
}

const rainBtn = document.getElementById("rain-btn");
rainBtn.addEventListener ("click",function(event){
    getRain();
});