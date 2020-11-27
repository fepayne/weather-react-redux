export const getCitySelector = (state) => state.weather.city
export const getCountrySelector = (state) => state.weather.country
export const getCurrentWeatherData = (state) => state.weather.currentWeatherData.main
export const getImgID = (state) => state.weather.currentWeatherData.weather[0].icon
export const getCurrentWeatherDescription = (state) => state.weather.currentWeatherData.weather[0].description
export const getWindSpeedSelector = (state) => state.weather.currentWeatherData.wind.speed
export const getPressureSelector = (state) => state.weather.currentWeatherData.main.pressure
export const getHumiditySelector = (state) => state.weather.currentWeatherData.main.humidity

export const getDailyForecastSelector = (state) => {
    let data = [];
    const forecastData = state.weather.dailyForecastData
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    for (let i = 0; i < 5; i++) {
        data[i] = {
            tempDay: Math.round(forecastData.daily[i].temp.day),
            tempMin: Math.round(forecastData.daily[i].temp.min),
            tempMax: Math.round(forecastData.daily[i].temp.max),
            'imgID': forecastData.daily[i].weather[0].icon,
            'day': days[new Date((forecastData.timezone_offset + forecastData.daily[i].dt) * 1000).getDay()]
        }
    }
    return data
}

export const getRangeValuesSelector = (state) => {
    const l = state.weather.todayWeatherData.length;
    let data = [];
    for (let i = 0; i < l; i++) {
        let time = new Date(state.weather.todayWeatherData[i].dt * 1000).getUTCHours() + state.weather.timeZone / 3600
        if (time >= 24) {
            time = time - 24;
        } 
        data.push([i, time ])
    }
    return data
}