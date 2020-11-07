import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: {
        Salad: 0,
        Bacon: 0,
        Meat: 0,
        Cheese: 0,
    },
    price: 2,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {};
        case actionTypes.REMOVE_INGREDIENT:
            return {};
        default:
            return state;
    }
};

export default reducer;
