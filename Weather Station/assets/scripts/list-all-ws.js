import { WeatherStationAPI } from "/assets/scripts/wsAPI.js"

window.onload = (e) => {
    document.getElementById('get-all-ws-button')?.addEventListener('click', LoadTable);
    document.getElementById('clear-all-ws-button')?.addEventListener('click', ClearTable);
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    ClearTable();
}

async function LoadTable() {
    const weatherStations = await WeatherStationAPI.GetAllWeatherStations();
    if (!weatherStations) {
        console.log('Could not load weather stations.')
        return;
    }

    const table = document.getElementById('ws-table');
    if (!table) {
        console.error('Could not find weather station table.');
        return;
    }

    ClearTable();

    let table_body = table.getElementsByTagName('tbody')?.[0];
    if (!table_body) {
        console.error('Could not find <tbod> in weather station table!');
        return;
    }

    // Add each row manually
    weatherStations.forEach(ws => {
        const row = document.createElement('tr');
        row.addEventListener('dblclick', () => { DeleteWeatherStation(ws.id) });

        row.innerHTML = `
            <td>${ws.id}</td>
            <td>${ws.name}</td>
            <td>${ws.location}</td>
            <td>${ws.temperature}</td>
            <td>${ws.weatherState}</td>
            <td>${ws.humidity}</td>
            <td>${ws.windSpeed}</td>
        `
        table_body.appendChild(row);
    });
}

function ClearTable() {
    const table = document.getElementById('ws-table');
    if (!table) {
        console.error('Could not find weather station table.')
        return;
    }

    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Temperature</th>
                <th>Weather state</th>
                <th>Humidity</th>
                <th>Wind speed</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    `;
}

export function DeleteWeatherStation(weatherStationId) {
    alert(`Deleting weather station with ID = ${weatherStationId}`);
    WeatherStationAPI.DeleteWeatherStation(weatherStationId);
    ClearTable();
    LoadTable(); // Reload table
}

