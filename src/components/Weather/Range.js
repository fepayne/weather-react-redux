import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/weather-reducer';
import { getRangeValuesSelector } from './selectors';
import * as style from './Range.module.css'

function Range({ dayTime, rangeValues, handleRange }) {
    const handleRangeChange = (event) => {
        handleRange(event.target.value)
    }

    if ((rangeValues.length - 1) <= 1) {
        return null
    }

    return (
        <div className={style.wrapper}>
            <form>
                <div className={style.range}>
                    <input className={style.rangeInput} value={dayTime} step='1' min='0' max={rangeValues.length - 1}
                        type='range' list="tickmarks" onChange={handleRangeChange} />
                    <datalist id="tickmarks" className={style.rangeList}>
                    
                        {rangeValues.map((value) => <option value={value[0]} label={value[1] + 'h.'} className={style.rangeOption} />)}
                    </datalist>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dayTime: state.weather.dayTime,
        rangeValues: getRangeValuesSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRange: (dayTimeN) => dispatch(actions.setCurrentWeather(dayTimeN))
    }
}

// export default Range
export default connect(mapStateToProps, mapDispatchToProps)(Range)