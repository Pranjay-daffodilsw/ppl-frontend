import { REFRESH_POST } from './postTypes';

export const refresh_post = ( posts = [] ) => {
    return {
        type: REFRESH_POST,
        payload: posts
    }
}