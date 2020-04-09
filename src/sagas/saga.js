import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { REFRESH_POST } from "../redux/post/postActionTypes";
import url from "../config/url";

function axiosPromise() {
	console.log('getPostAsync function called');
	return axios.get(url.backendURL + url.paths.postGet);
}


function* getPostAsync() {
	
	try{
		console.log('watchRefreshPost function called +++++++++++++++');
		let {result} = yield call(axiosPromise);
		console.log(result);
		yield put({
			type: REFRESH_POST + 'New',
			result: result.data
		})
	}
	catch(e){
		console.error('saga.js error - ', e);
	}
	
}


// export function* watchRefreshPost() {
// 	yield takeEvery(REFRESH_POST+'New', getPostAsync);
// }
axiosPromise().then((res)=> {console.log(res.data)})

export function* watchRefreshPost() {
	console.log('Hello sagas!');
}