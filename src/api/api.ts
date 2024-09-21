import axios from 'axios'

export const apiInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    responseType: 'json',
})
