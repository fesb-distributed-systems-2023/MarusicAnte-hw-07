const Base_URL = 'http://localhost:5193'

class _WeatherStationAPI {

    async GetAllWeatherStations() {
        const URL = `${Base_URL}/weatherstations/all`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-TYpe": "application/json"
            }
        });

        if (!response.ok) {
            console.error('Could not get weather stations from the API')
            return null;
        }

        return response.json();
    }

    // Returns true if successful and fals if failed
    async CreateNewWeatherStation(weatherStation) {
        const URL = `${Base_URL}/weatherstations/new`;
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-TYpe": "application/json"
            },
            body: JSON.stringify(weatherStation)
        });

        if (!response.ok) {
            console.error('Could not create new weather station.')
            // Bad Request 
            if (response.status === 400) {
                alert(await response.text())
            }
            return false;
        }

        return true;
    }

    async DeleteWeatherStation(weatherStationId) {
        const URL = `${Base_URL}/weatherstations/${weatherStationId}`;
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error(`Could not delete weather station with id = ${weatherStationId}.`)
            //Bad Request 
            if (response.status === 400) {
                alert(await response.text())
            }
        }
    }
}

export const WeatherStationAPI = new _WeatherStationAPI();