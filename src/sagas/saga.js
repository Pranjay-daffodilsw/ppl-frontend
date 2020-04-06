import { takeEvery, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import url from "../config/url";

function* getPostAsync() {
	yield delay(2000);
	let payload;
	axios.get(url.backendURL + url.paths.postGet)
		.then(
			(res) => {
				console.log(res.data);
				payload = res.data
			}
		)
		.catch(
			(err) => {
				console.log('axios error', err);
			}
		)
	console.log('payload - ', payload)
	yield put({
		type: 'REFRESH_POST_ASYNC',
		payload: payload
	})
}



export function* watchRefreshPost() {
	console.log('watchRefreshPost function called +++++++++++++++');
	yield takeEvery("REFRESH_POST", getPostAsync);
}