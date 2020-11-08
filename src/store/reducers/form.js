import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FAIL_FORM:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.LOAD_FORM:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.UNLOAD_FORM:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.SUCCESS_FORM:
            return {
                ...state,
                success: true,
            };
        default:
            return state;
    }
};

export default reducer;
