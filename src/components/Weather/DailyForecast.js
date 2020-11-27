import React from 'react'
import { connect } from 'react-redux'
import { getDailyForecastSelector } from './selectors';
import * as style from './DailyForecast.module.css'



function DailyForecast({ dailyForecastDataPart }) {
    return (
        <div className={style.wrapper}>
            {dailyForecastDataPart.map(item => {
                return (
                    <div key={item.day}>
                        <p className={style.text}>{item.day}</p>
                        <img src={`http://openweathermap.org/img/wn/${item.imgID}@2x.png`} alt={item.imgID}></img>
                        <p className={style.text}>{item.tempDay}</p>
                        <p className={style.text + ' ' + style.additionalText }>{item.tempMin} / {item.tempMax}</p>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dailyForecastDataPart: getDailyForecastSelector(state)
    }
}

export default connect(mapStateToProps, null)(DailyForecast)