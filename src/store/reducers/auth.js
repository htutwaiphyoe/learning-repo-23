import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_AUTH_LOADING:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.SHOW_ERROR:
            return updateObject(state, { error: action.payload, loading: false });
        default:
            return state;
    }
};

export default reducer;
