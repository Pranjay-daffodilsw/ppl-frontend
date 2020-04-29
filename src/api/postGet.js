import axios from 'axios';
import url from "../config/url";


export function postGet(params) {
	console.log('postGet function called', params);
	return axios.get(url.backendURL + url.paths.postGet, {params: params})
}