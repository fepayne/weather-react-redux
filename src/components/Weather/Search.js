import React from 'react'
import { Field, reduxForm, reset, SubmissionError } from 'redux-form'
import { requestTodayWeather, requestDailyForecast } from '../../redux/weather-reducer'
import * as style from './Search.module.css'

const renderField = ({ input, type, placeholder, meta: { error } }) => (
    <div>
        <div className={style.searchInput}>
            <input {...input} placeholder={placeholder} type={type} />
            <button>Search</button>
        </div>
        {error && <span className={style.error}>{error}</span>}
    </div>
)

function SearchForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <Field name="city" component={renderField} placeholder='Enter city' type="text" label='' />
        </form>
    )
}

const SearchReduxForm = reduxForm({ form: 'search' })(SearchForm)

function SeacrhContainer() {
    const onSubmit = async (formData, dispatch) => {
        try {
            await dispatch(requestTodayWeather(formData.city))
            await dispatch(requestDailyForecast())
            dispatch(reset('search'))
        } catch (error) {
            throw new SubmissionError({ city: error.message, _error: error.message })
        }
    }

    return (
        <div className={style.wrapper}>
            <h3 className={style.searchH3}>Search</h3>
            <SearchReduxForm onSubmit={onSubmit}></SearchReduxForm>
        </div>
    )
}

export default SeacrhContainer
