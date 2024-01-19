import { WeatherStationAPI } from "/assets/scripts/wsAPI.js";

window.onload = (e) => {
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    document.getElementById('clear-all-fields-button')?.addEventListener('click', OnClearButtonClick);
    document.getElementById('send-ws-button')?.addEventListener('click', OnSendWeatherStationButtonClick);
}

function OnClearButtonClick() {
    document.getElementById('name').value = '';
    document.getElementById('location').value = '';
    document.getElementById('temperature').value = '';
    document.getElementById('weatherstate').value = '';
    document.getElementById('humidity').value = '';
    document.getElementById('windspeed').value = '';
}

async function OnSendWeatherStationButtonClick() {
    let weatherStation = {};

    const name = document.getElementById('name');
    if (!name) {
        alert('Name field is empty!')
        return;
    }
    weatherStation.name = name.value;

    const location = document.getElementById('location');
    if (!location) {
        alert('Location field is empty!')
        return;
    }
    weatherStation.location = location.value;

    const temperature = document.getElementById('temperature');
    if (!temperature) {
        alert('Temperature field is empty!')
        return;
    }
    weatherStation.temperature = temperature.value;

    const weatherState = document.getElementById('weatherstate');
    if (!weatherState) {
        alert('Weather state field is empty!')
        return;
    }
    weatherStation.weatherState = weatherState.value;

    const humidity = document.getElementById('humidity');
    if (!humidity) {
        alert('Humidity field is empty!')
        return;
    }
    weatherStation.humidity = humidity.value;

    const windSpeed = document.getElementById('windspeed');
    if (!windSpeed) {
        alert('Wind speed field is empty!')
        return;
    }
    weatherStation.windSpeed = windSpeed.value;

    const success = await WeatherStationAPI.CreateNewWeatherStation(weatherStation);
    if (success) {
        alert('Weather station successfully sent')
        OnClearButtonClick();
    }
}