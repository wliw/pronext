import Flyio from 'flyio';
import { API_DOMAIN } from '../constants/constants.js';

const flyio = new Flyio();
const baseURL = API_DOMAIN;

Object.assign(flyio.config, {
    baseURL,
    timeout: 10000
});

class Base {
    request ({
        url,
        method = 'GET',
        data = {},
        withCredentials = false
    } = {}) {
        const options = {
            method: method.toUpperCase(),
            withCredentials
        };

        return flyio.request({
            url,
            data,
            options
        });
    }
}

export default Base;
