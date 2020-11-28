import React from 'react';
import { Field, reduxForm, reset, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import {
  requestTodayWeather,
  requestDailyForecast,
} from '../../redux/weather-reducer';
import * as style from './Search.module.css';

const renderField = ({ input, type, placeholder, meta: { error } }) => (
  <div>
    <div className={style.searchInput}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...input} placeholder={placeholder} type={type} />
      <button type="submit">Search</button>
    </div>
    {error && <span className={style.error}>{error}</span>}
  </div>
);

function SearchForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="city"
        component={renderField}
        placeholder="Enter city"
        type="text"
        label=""
      />
    </form>
  );
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const SearchReduxForm = reduxForm({ form: 'search' })(SearchForm);

function SeacrhContainer() {
  const onSubmit = async (formData, dispatch) => {
    try {
      await dispatch(requestTodayWeather(formData.city));
      await dispatch(requestDailyForecast());
      dispatch(reset('search'));
    } catch (error) {
      throw new SubmissionError({ city: error.message, _error: error.message });
    }
  };

  return (
    <div className={style.wrapper}>
      <h3 className={style.searchH3}>Search</h3>
      <SearchReduxForm onSubmit={onSubmit} />
    </div>
  );
}

export default SeacrhContainer;
