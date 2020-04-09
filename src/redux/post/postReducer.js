import { REFRESH_POST, REFRESH_POST_ASYNC } from './postActionTypes';

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    console.log('postReducer() arguments', state, action)
    switch(action.type){
        case REFRESH_POST: return {
            posts: action.payload
        }
        case REFRESH_POST_ASYNC: return {
            posts: action.payload
        }
        default: return state
    }
}

export default postReducer;