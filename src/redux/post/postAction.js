import { REFRESH_POST, LOAD_POST } from './postActionTypes';

export const refresh_post = ( items = [], options = {}) => {
    return {
        type: REFRESH_POST,
        payload: {
            items: items,
            options: options
        }
    }
}

export const load_post = (itemsOld = [], options = {}) => {
    return {
        type: LOAD_POST,
        payload: {itemsOld: itemsOld, options: options}
    }
}