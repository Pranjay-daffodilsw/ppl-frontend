import { combineReducers } from "redux";
import postReducer from './post/postReducer';

const rootReducer = combineReducers({
    post: postReducer
})

export default rootReducer;