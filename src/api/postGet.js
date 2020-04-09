import axios from 'axios';
import url from "../config/url";


export function postGet() {
	console.log('postGet function called');
	return axios.get(url.backendURL + url.paths.postGet)
}