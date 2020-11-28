/* eslint-disable react-redux/prefer-separate-component-file */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from './Search';
import DailyForecast from './DailyForecast';
import {
  getCitySelector,
  getCountrySelector,
  getCurrentWeatherData,
  getImgID,
  getCurrentWeatherDescription,
  getPressureSelector,
  getHumiditySelector,
  getWindSpeedSelector,
} from './selectors';
import * as style from './Weather.module.css';
import Range from './Range';
import windIcon from '../../images/wind.png';
import windPressure from '../../images/pressure.png';
import windHumidity from '../../images/humidity.png';

function Weather({
  city,
  country,
  currentWeatherData,
  imgID,
  description,
  windSpeed,
  pressure,
  humidity,
}) {
  return (
    <div className={style.wrapper}>
      <Search />

      <div>
        <div>
          <h2>{`${city}, ${country}`}</h2>
        </div>
        <div>
          <span className={style.weather}>
            <img
              src={`http://openweathermap.org/img/wn/${imgID}@2x.png`}
              alt="img"
              className={style.weatherImg}
            />
            {`${Math.round(currentWeatherData.temp)} °C`}
          </span>
        </div>
        <div>
          <span>{`Feels like ${Math.round(currentWeatherData.feels_like)}. `}</span>
          <span>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </span>
        </div>

        <div className={style.additionalInfo}>
          <div>
            <img src={windIcon} alt="wind" className={style.icon} />
            {`${windSpeed}m/s`}
          </div>
          <div>
            <img src={windPressure} alt="pressure" className={style.icon} />
            {`${pressure}hPa`}
          </div>
          <div>
            <img src={windHumidity} alt="humidity" className={style.icon} />
            {`Humidity: ${humidity}%`}
          </div>
        </div>

        <Range />
      </div>

      <DailyForecast />
    </div>
  );
}

Weather.propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    currentWeatherData: PropTypes.object.isRequired,
    imgID: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    windSpeed: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
  };

const mapStateToProps = (state) => {
  return {
    city: getCitySelector(state),
    country: getCountrySelector(state),
    currentWeatherData: getCurrentWeatherData(state),
    imgID: getImgID(state),
    description: getCurrentWeatherDescription(state),
    windSpeed: getWindSpeedSelector(state),
    pressure: getPressureSelector(state),
    humidity: getHumiditySelector(state),
  };
};

export default connect(mapStateToProps, null)(Weather);
