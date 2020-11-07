import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: {
        Salad: 0,
        Bacon: 0,
        Cheese: 0,
        Meat: 0,
    },
    price: 2,
};
const INGREDIENT_PRICE = {
    Salad: 0.4,
    Bacon: 0.7,
    Cheese: 0.5,
    Meat: 1.5,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default reducer;
