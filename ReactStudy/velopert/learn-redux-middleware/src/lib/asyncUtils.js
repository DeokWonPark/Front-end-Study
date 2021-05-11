export const createPromiseThunk = (type, promiseCreater) =>{
    const [SUCCESS,ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

    return (param) => async(dispatch) => {
        dispatch({type, param});
        try{
            const payload = await promiseCreater(param);
            dispatch({type:SUCCESS, payload});
        }catch(e){
            dispatch({type:ERROR, error:e});
        }
    }
}

const defaultIdSelector = param => param;
export const createPromiseThunkById = (type, promiseCreater, idSelector = defaultIdSelector) => {
    const [SUCCESS,ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

    return (param) => async (dispatch) => {
        const id = idSelector(param);
        dispatch({type, meta:id});

        try{    
            const payload = await promiseCreater(param);
            dispatch({type:SUCCESS, payload, meta:id})
        }catch(e){
            dispatch({type:ERROR, error:e, meta:id});
        }
    }
}

export const reducetUtils = {
    initial:(initialData = null) => ({
        loading:false,
        data:initialData,
        error:null,
    }),

    loading:(prevState = null) => ({
        loading:true,
        data:prevState,
        error:null,
    }),

    success:(payload) => ({
        loading:false,
        data:payload,
        error:null,
    }),

    error:(error) => ({
        loading:false,
        data:null,
        error:error
    })
}

export const handleAsyncAction = (type, key, keepdata=false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

    return (state, action) => {
        switch(action.type){
            case type:
                return {
                    ...state,
                    [key]:reducetUtils.loading(keepdata?state[key].data:null),
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]:reducetUtils.success(action.payload)
                }
            case ERROR:
                return {
                    ...state,
                    [key]:reducetUtils.error(action.error)
                }
            default:
                return state;
        }
    }
}

export const handleAsyncActionById = (type, key, keepdata=false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

    return (state, action) => {
        const id = action.meta;
        switch(action.type){
            case type:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducetUtils.loading(
                            keepdata ? state[key][id] && state[key][id].data : null
                        )
                    }
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducetUtils.success(action.payload)
                    }
                }
            case ERROR:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]:reducetUtils.error(action.error)
                    }
                }
            default:
                return state;
        }
    }
}