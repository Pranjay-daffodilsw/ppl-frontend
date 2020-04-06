import { REFRESH_POST } from './postActionTypes';

export const refresh_post = ( posts = [] ) => {
    return {
        type: REFRESH_POST,
        payload: posts
    }
}