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
                loading: false,
            };
        case actionTypes.LOAD_FORM:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESS_FORM:
            return {
                ...state,
                success: true,
                loading: false,
            };
        case actionTypes.END_SUCCESS:
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
};

export default reducer;
