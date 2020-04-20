import { TOGGLE_UPLOAD_POST, TOGGLE_ADD_CATEGORY } from './toggleActionTypes';


export const toggle_upload_post = (args = true
) => {
    return {
        type: TOGGLE_UPLOAD_POST,
        payload: args
    }
}

export const toggle_add_category = (args = true) => {
    return {
        type: TOGGLE_ADD_CATEGORY,
        payload: args
    }
}