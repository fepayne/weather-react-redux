import axios from "axios";

export const APPID = '2514a68b321539552e43610cd9ef7744'

export const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
})