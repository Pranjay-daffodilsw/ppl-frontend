import { combineReducers } from "redux";
import postReducer from './post/postReducer';
import userReducer from './user/userReducer';
import toggleReducer from './toggle/toggleReducer'; 

const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer,
	toggle: toggleReducer
})

export default rootReducer;