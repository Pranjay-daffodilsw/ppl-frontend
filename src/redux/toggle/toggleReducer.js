import { TOGGLE_UPLOAD_POST, TOGGLE_ADD_CATEGORY } from './toggleActionTypes';

const initialState = {
    uploadPost: {
        show: false
    },
    addCategory: {
        show: false
    }
}

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_UPLOAD_POST: return {
            ...state,
            uploadPost: {
                show: !action.payload
            },
            addCategory: {
                show: false
            }
        };
        case TOGGLE_ADD_CATEGORY: return {
            ...state,
            addCategory: {
                show: !action.payload
            },
            uploadPost: {
                show: false
            }
        }
        default: return state;
    }
}

export default toggleReducer;