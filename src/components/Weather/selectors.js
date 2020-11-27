export const getCitySelector = (state) => state.weather.currentWeatherData.city.name
export const getCountrySelector = (state) => state.weather.currentWeatherData.city.country
export const getCurrentWeatherData = (state) => state.weather.currentWeatherData.list[0].main
export const getImgID = (state) => state.weather.currentWeatherData.list[0].weather[0].icon
export const getCurrentWeatherDescription = (state) => state.weather.currentWeatherData.list[0].weather[0].description

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