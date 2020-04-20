import { TOGGLE_UPLOAD_POST } from './toggleActionTypes';

const initialState = {
    uploadPost: {
        show: false
    }
}

const toggleReducer = ( state = initialState, action ) => {
    console.log('toggle Reducer', state, action)
    switch(action.type){
        case TOGGLE_UPLOAD_POST: return {
            ...state,
            uploadPost: {
                show: !action.payload
            }
        };
        default: return initialState;
    }
}

export default toggleReducer;