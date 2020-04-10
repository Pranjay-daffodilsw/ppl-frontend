import { takeEvery, put } from 'redux-saga/effects';
import { LOAD_POST } from "../redux/post/postActionTypes";
import { refresh_post } from '../redux';
import { postGet } from '../api/postGet'

function* getPostAsync() {
	try {
		let response = yield postGet();
		// console.log('getPostAsync function called with result - ', response);
		yield put(refresh_post(response.data, true))
	}
	catch (e) {
		console.error('saga.js error - ', e);
	}
}

export function* watchRefreshPost() {
	yield takeEvery(LOAD_POST, getPostAsync);
}