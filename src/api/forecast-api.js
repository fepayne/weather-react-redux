import { instance } from './api';

const forecastAPI = {
  getDailyForecast(lat, lon, appid) {
    return instance.get(
      `onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${appid}&units=metric`
    );
  },
  getCurrentWeather(city, appid) {
    return instance.get(`forecast?q=${city}&units=metric&appid=${appid}&cnt=8`);
  },
};

export default forecastAPI;
