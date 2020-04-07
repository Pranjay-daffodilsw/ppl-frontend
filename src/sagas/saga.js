import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { REFRESH_POST } from "../redux/post/postActionTypes";
import url from "../config/url";

function getPostAsync() {
	console.log('getPostAsync function called - ');
	return axios.get(url.backendURL + url.paths.postGet);
}


export function* watchRefreshPost() {
	console.log('watchRefreshPost function called +++++++++++++++');
	try{
		let result = yield call(getPostAsync);
		yield put({
			type: REFRESH_POST,
			result: result.data
		})
	}
	catch(e){
		console.error('saga.js error - ', e);
	}
	
	// yield [ 'an empty array' ]
	// yield takeEvery("REFRESH_POST", getPostAsync);
}