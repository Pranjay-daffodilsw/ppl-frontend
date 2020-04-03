import { REFRESH_POST } from './postTypes';

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch(action.type){
        case REFRESH_POST: return {
            posts: action.payload
        }
        default: return state
    }
}

export default postReducer;