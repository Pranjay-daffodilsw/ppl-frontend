import axios from 'axios';
import url from "../config/url";


export function postGet() {
	console.log('postGet function called');
	let params = {
		fromElement: 0,
		uptoElement: 3
	}
	return axios.get(url.backendURL + url.paths.postGet, {params})
}