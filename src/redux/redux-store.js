import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { forecastReducer } from './weather-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer'
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    weather: forecastReducer,
    app: appReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
window.__store__ = store

export default store
