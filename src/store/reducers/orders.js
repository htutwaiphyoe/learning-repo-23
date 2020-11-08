import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    error: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };
        case actionTypes.FAIL_ORDERS:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case actionTypes.SHOW_ORDER_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default reducer;
