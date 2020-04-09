import { REFRESH_POST, REFRESH_POST_ASYNC, LOAD_POST } from './postActionTypes';

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    console.log('postReducer() arguments', state, action)
    switch(action.type){
        case REFRESH_POST: return {
            ...state,
            posts: action.payload
        }
        case REFRESH_POST_ASYNC: return {
            posts: action.payload
        }
        case LOAD_POST: return {
            ...state,
            posts: action.payload
        }
        default: return state
    }
}

export default postReducer;