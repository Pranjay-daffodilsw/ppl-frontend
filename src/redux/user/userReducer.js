import { UPDATE_USER_DATA } from './userActionTypes';

const initialState = {
	loginStatus: {
		loginTrue: false
	}
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER_DATA:
			return {
				...state,
				loginStatus: action.payload
			}
		default: return state
	}
}

export default userReducer;