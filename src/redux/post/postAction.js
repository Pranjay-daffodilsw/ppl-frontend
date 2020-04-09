import { REFRESH_POST } from './postActionTypes';

export const refresh_post = ( posts = [] ) => {
    console.log('refresh_post action posts - ', posts);
    return {
        type: REFRESH_POST,
        payload: posts
    }
}