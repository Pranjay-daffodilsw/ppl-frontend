import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { REFRESH_POST } from "../redux/post/postActionTypes";
import url from "../config/url";
import { refresh_post_async } from '../redux';

function axiosPromise() {
	console.log('axiosPromise function called');
	return axios.get(url.backendURL + url.paths.postGet)
}


function* getPostAsync() {
	try {
		let response = yield axiosPromise();
		// console.log('getPostAsync function called with result - ', response);
		yield put(refresh_post_async(response.data))
	}
	catch (e) {
		console.error('saga.js error - ', e);
	}

}


export function* watchRefreshPost() {
	yield takeEvery(REFRESH_POST, getPostAsync);
}