import { forecastAPI } from '../api/forecast-api';
import { APPID } from '../api/api';

let initialState = {
    currentWeatherData: [],
    todayWeatherData: [],
    dayTime: 0,
    dailyForecastData: [],
    city: null,
    country: null,
    cityCoord: [0, 0],
    timeZone: null,
}

export const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WEATHER/SET-TODAY-WEATHER':
            return {
                ...state,
                city: action.payload.data.city.name,
                country: action.payload.data.city.country,
                cityCoord: [action.payload.data.city.coord.lat, action.payload.data.city.coord.lon],
                timeZone: action.payload.data.city.timezone,
                dayTime: 0,
                allData: action.payload.data.list,

                currentWeatherData: action.payload.data.list[0],
                // Нормально ли в редьюсере фильтровать полученные данные? 
                // todayWeatherData: action.payload.data.list.filter((item) => {
                //     let nextDayTime = new Date().setUTCHours(24, 0, 0, 0) - action.payload.data.city.timezone * 1000
                    
                //     return (item.dt * 1000) < nextDayTime
                // }),
                todayWeatherData: action.payload.data.list
            }
        case 'WEATHER/SET-CURRENT-WEATHER':
            return {
                ...state,
                dayTime: action.payload,
                currentWeatherData: state.todayWeatherData[action.payload],
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
    setTodayWeather: (todayWeatherData) => ({ type: 'WEATHER/SET-TODAY-WEATHER', payload: todayWeatherData }),
    setCurrentWeather: (dayTimeNum) => ({ type: 'WEATHER/SET-CURRENT-WEATHER', payload: dayTimeNum }),
    setDailyForecast: (dailyForecastData) => ({ type: 'WEATHER/SET-DAILY-FORECAST', payload: dailyForecastData }),
}

export const requestTodayWeather = (city) => {
    return async (dispatch) => {
        try {
            const data = await forecastAPI.getCurrentWeather(city, APPID)
            await dispatch(actions.setTodayWeather(data))
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

