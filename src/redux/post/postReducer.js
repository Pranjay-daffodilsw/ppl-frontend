import { REFRESH_POST } from './postActionTypes';

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    console.log('post reducer state and action - ', state, action)
    switch (action.type) {
        case REFRESH_POST: {
            return {
                ...state,
                posts: action.payload.options.clearOld ? action.payload.items : [...state.posts, ...action.payload.items],
                totalElements: action.payload.options.totalElements
            }
        }

        // case LOAD_POST:
        //     console.log('LOAD_POST')
        //     return {
        //         ...state,
        //         postsCurrent: action.payload,
        //         posts: action.payload
        //     }
        default: return state
    }
}

export default postReducer;