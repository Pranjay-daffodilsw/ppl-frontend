import { UPDATE_USER_DATA } from './userActionTypes';

const initialState = {
    loginTrue: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return {
                ...state,
                loginStatus: action.payload.loginStatus
            }
        default: return state
    }
}

export default userReducer;