import { takeEvery, put } from 'redux-saga/effects';
import { LOAD_POST } from "../redux/post/postActionTypes";
import { refresh_post } from '../redux';
import { postGet } from '../api/postGet'

function* getPostAsync(action) {
	try {
		let response = yield postGet(action.payload.options);
		console.log('action to saga - ', action,
			'arguments out from saga', response.data.data, {
			totalElements: response.data.totalElements,
			clearOld: action.payload.options.clearOld,
			itemsOld: action.payload.itemsOld
		})
		yield put(refresh_post(response.data.data, {
			totalElements: response.data.totalElements,
			clearOld: action.payload.options.clearOld,
			itemsOld: action.payload.itemsOld
		}))
	}
	catch (e) {
		console.error('saga.js error - ', e);
	}
}

export function* watchRefreshPost() {
	yield takeEvery(LOAD_POST, getPostAsync);
}