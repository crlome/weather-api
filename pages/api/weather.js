const axios = require('axios');

let url = 'http://api.weatherapi.com/v1/forecast.json?key=f937b1c87312476ba7f30722202409';

const init = (url, method) => (payload) => {
	let path = `&q=${payload.zip_code || ''}&days=${payload.days || 1}`;

	return axios[method](`${url}${path}`);
}

const api = {
	get: init(url, 'get'),
};

export default api;