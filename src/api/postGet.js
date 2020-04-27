import axios from 'axios';
import url from "../config/url";


export function postGet(params = {
	fromElement: 0,
	uptoElement: 1
}) {
	console.log('postGet function called');
	return axios.get(url.backendURL + url.paths.postGet, {params: params})
}