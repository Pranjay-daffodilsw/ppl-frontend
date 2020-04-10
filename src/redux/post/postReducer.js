import { REFRESH_POST,  LOAD_POST } from './postActionTypes';

const initialState = {
    posts: [],
    postsCurrent: []
}

const postReducer = (state = initialState, action) => {
    console.log('postReducer() arguments', state, action)
    
    switch(action.type){
        case REFRESH_POST: {
            console.log(action.payload.loadFresh);
            return {
                ...state,
                posts: action.payload.data,
                postsCurrent: action.payload.loadFresh? action.payload.data : state.postsCurrent
            }
        }
        
        case LOAD_POST: return {
            ...state,
            postsCurrent: action.payload,
            posts: action.payload
        }
        default: return state
    }
}

export default postReducer;