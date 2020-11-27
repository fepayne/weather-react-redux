import { forecastAPI } from '../api/forecast-api';
import { APPID } from '../api/api';

let initialState = {
    currentWeatherData: [],
    todayWeatherData: [],
    dayTime: null,
    dailyForecastData: [],
    cityCoord: [0, 0],
}

export const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WEATHER/SET-CURRENT-WEATHER':
            return {
                ...state,
                currentWeatherData: action.payload.data,
                cityCoord: [action.payload.data.city.coord.lat, action.payload.data.city.coord.lon]
            }
        case 'WEATHER/SET-DAILY-FORECAST':
            return {
                ...state,
                dailyForecastData: action.payload.data,
            }
        default:
            return state
    }
}

export const actions = {
    setCurrentWeather: (currentWeatherData) => ({ type: 'WEATHER/SET-CURRENT-WEATHER', payload: currentWeatherData }),
    setDailyForecast: (dailyForecastData) => ({ type: 'WEATHER/SET-DAILY-FORECAST', payload: dailyForecastData })
}

export const requestCurrrentWeather = (city) => {
    return async (dispatch) => {
        try {
            const data = await forecastAPI.getCurrentWeather(city, APPID)
            await dispatch(actions.setCurrentWeather(data))
        } catch (error) {
            if (error.response.data.cod === '404') {
                throw new Error(error.response.data.message)
            }
        }
    }
}

export const requestDailyForecast = () => {
    return async (dispatch, getState) => {
        const state = getState()
        const lat = state.weather.cityCoord[0];
        const lon = state.weather.cityCoord[1];
        try {
            const data = await forecastAPI.getDailyForecast(lat, lon, APPID)
            await dispatch(actions.setDailyForecast(data))
        } catch (error) {
            if (error.response.data.cod === '404') {
                throw new Error(error.response.data.message)
            }
        }
    }
}

