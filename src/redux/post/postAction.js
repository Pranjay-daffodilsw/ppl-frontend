import { REFRESH_POST, REFRESH_POST_ASYNC, LOAD_POST } from './postActionTypes';

export const refresh_post = ( posts = [] ) => {
    console.log('refresh_post action posts - ', posts);
    return {
        type: REFRESH_POST,
        payload: posts
    }
}
export const refresh_post_async = ( posts = [] ) => {
    console.log('refresh_post_async called -', posts)
    return {
        type: REFRESH_POST_ASYNC,
        payload: posts
    }
}
export const load_post = ( posts = [] ) => {
    return {
        type: LOAD_POST,
        payload: posts
    }
}