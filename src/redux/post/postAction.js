import { REFRESH_POST, LOAD_POST } from './postActionTypes';

export const refresh_post = ( posts = [], loadFresh = false ) => {
    console.log('refresh_post action posts - ', posts);
    return {
        type: REFRESH_POST,
        payload: {
            data: posts,
            loadFresh: loadFresh
        }
    }
}

export const load_post = ( posts = [] ) => {
    return {
        type: LOAD_POST,
        payload: posts
    }
}