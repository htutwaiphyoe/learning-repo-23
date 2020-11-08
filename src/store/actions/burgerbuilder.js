import * as actionTypes from "./actionTypes";
import burgerbuilder from "../../api/burgerbuilder";
export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload,
    };
};

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload,
    };
};

export const initIngredients = () => async (dispatch) => {
    const response = await burgerbuilder.get("/ingredients.json");
    dispatch({ type: actionTypes.INIT_INGREDIENTS, payload: response.data });
};
