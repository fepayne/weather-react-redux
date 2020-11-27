import React from 'react'
import { connect } from 'react-redux'
import { getCitySelector, getCountrySelector, getCurrentWeatherData, getImgID, getCurrentWeatherDescription } from './selectors';
import * as style from './Weather.module.css'

function Range({ }) {
    const handleRangeChange = (event) => {
        console.log(event.target.value);
    }

    return (
        <div>
            <form>
                <input step='20' type='range' list="tickmarks" onChange={handleRangeChange}></input>
                <datalist id="tickmarks">
                    <option value="0" label="0%" />
                    <option value="20" label="1" />
                    <option value="40" label="2" />
                    <option value="60" label="3" />
                    <option value="80" label="4" />
                    <option value="100" label="100%" />
                </datalist>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        
    }
}

// export default Range
export default connect(mapStateToProps, {})(Range)