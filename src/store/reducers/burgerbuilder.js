import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    price: 2,
    error: null,
};
const INGREDIENT_PRICE = {
    Salad: 0.4,
    Bacon: 0.7,
    Cheese: 0.5,
    Meat: 1.5,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    Salad: action.payload.Salad,
                    Bacon: action.payload.Bacon,
                    Cheese: action.payload.Cheese,
                    Meat: action.payload.Meat,
                },
                price: 2,
            };
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1,
                },
                price: state.price + INGREDIENT_PRICE[action.payload],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1,
                },
                price: state.price - INGREDIENT_PRICE[action.payload],
            };
        case actionTypes.INIT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
