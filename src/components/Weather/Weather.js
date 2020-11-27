import React from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import DailyForecast from './DailyForecast'
import { getCitySelector, getCountrySelector, getCurrentWeatherData, getImgID, getCurrentWeatherDescription } from './selectors';
import * as style from './Weather.module.css'
import Range from './Range';

function Weather({ city, country, currentWeatherData, imgID, description }) {
    return (
        <div className={style.wrapper}>
            <Search/>

            <div>
                <div>
                    <h2>{city}, {country}</h2>
                </div>
                <div>
                    <span className={style.weather}>
                        <img src={`http://openweathermap.org/img/wn/${imgID}@2x.png`} alt='img' className={style.weatherImg}></img>
                        {Math.round(currentWeatherData.temp)} °C
                    </span>
                </div>
                <div>
                    <span>Feels like {Math.round(currentWeatherData.feels_like)}. </span>
                    <span>{description.charAt(0).toUpperCase() + description.slice(1)}</span>
                </div>
                
                <Range></Range>
                
            </div>

            <DailyForecast></DailyForecast>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        city: getCitySelector(state),
        country: getCountrySelector(state),
        currentWeatherData: getCurrentWeatherData(state),
        imgID: getImgID(state),
        description: getCurrentWeatherDescription(state),
    }
}

export default connect(mapStateToProps, null)(Weather)