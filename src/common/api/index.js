import { get as getFromLocalStorage } from '../local-storage';

function addHeaders(options, getFromLocalStorageMethod) {
    const settings = {
        ...options,
        mode: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const token = getFromLocalStorageMethod('token');

    if (token) {
        settings.credentials = 'include';
        settings.headers.Authorization = `Bearer ${token}`;
    }
    return settings;
}

function addBaseApiUrl(url) {
    return process.env.API_BASE_URL + url;
}

function parseResponse(response) {
    return response.json();
}

function onFetchFail(error) {
    throw error;
}

export default (url, options = {}) =>
    fetch(addBaseApiUrl(url), addHeaders(options, getFromLocalStorage))
        .then(parseResponse)
        .catch(onFetchFail);
