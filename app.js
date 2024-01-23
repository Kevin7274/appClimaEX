const APIKEY = '544a0b19483a14d6c54fcc13f9caebc1';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';
 
async function request(url){
    return fetch(url).then(result => result.json());
}




async function getClima(lat, lon) {
    const url = URLBASE + `lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
    const data = await request(url);
    updateDOM(data.main.temp, data.name);
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    const url = URLBASE + `q=${city}&appid=${APIKEY}&units=metric`;
    const data = await request(url);

    if (data.cod === "404") {
        alert("Ciudad inexistente");
        return;
    }
    
    updateDOM(data.main.temp, data.name);
}

function updateDOM(temperature, cityName) {
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("cityName").textContent = cityName;
}

navigator
     .geolocation
     .getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getClima(lat, lon);
     })