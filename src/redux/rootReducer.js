import { combineReducers } from "redux";
import postReducer from './post/postReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
	post: postReducer,
	user: userReducer
})

export default rootReducer;