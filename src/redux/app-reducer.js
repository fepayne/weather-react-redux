import { requestCurrrentWeather, requestDailyForecast } from './weather-reducer';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' })
}

export const initializeApp = () => (dispatch) => {
    dispatch(requestCurrrentWeather('Kharkov')).then(() => {
        dispatch(requestDailyForecast()).then(() => {
                dispatch(actions.initializedSuccess())
            })
    })
}

export default appReducer