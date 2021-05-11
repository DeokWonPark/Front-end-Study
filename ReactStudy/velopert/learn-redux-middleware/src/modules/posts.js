import * as postsApi from '../api/posts';
import { createPromiseThunk, createPromiseThunkById, handleAsyncAction, handleAsyncActionById, reducetUtils } from '../lib/asyncUtils';

//액션 타입 정의
// 여러개의 포스트 조회하는 액션타입
const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

// 하나의 포스트 조회하는 액션타입
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// 포스트 비우기
//const CLEAR_POST = "CLEAR_POST";


// thunk 함수 정의
export const getPosts = createPromiseThunk(`GET_POSTS`,postsApi.getPosts);
export const getPost = createPromiseThunkById(`GET_POST`,postsApi.getPostsById);

//export const clearPost = () => ({type:CLEAR_POST});

//초기상태 정의
const initialState = {
    posts: reducetUtils.initial(),
    post: {},
};

// reducer 정의
export default function posts(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncAction(GET_POSTS,"posts",true)(state,action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActionById(GET_POST,"post")(state,action);
        // case CLEAR_POST:
        //     return {
        //         ...state,
        //         post:reducetUtils.initial(),
        //     }
        default:
            return state;
    }
}

export const goToHome = () => (dispatch, getState, {history}) => {
    history.push('/');
} 


