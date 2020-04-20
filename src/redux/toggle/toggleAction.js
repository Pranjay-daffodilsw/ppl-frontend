import { TOGGLE_UPLOAD_POST } from './toggleActionTypes';

export const toggle_upload_post = ( args = true
    ) => {
    return {
        type: TOGGLE_UPLOAD_POST,
        payload: args
    }
}