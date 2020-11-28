import { requestTodayWeather, requestDailyForecast } from './weather-reducer';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' }),
};

export const initializeApp = () => (dispatch) => {
  dispatch(requestTodayWeather('Kharkov')).then(() => {
    dispatch(requestDailyForecast()).then(() => {
      dispatch(actions.initializedSuccess());
    });
  });
};

export default appReducer;
