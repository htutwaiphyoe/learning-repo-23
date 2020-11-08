import * as actionTypes from "./actionTypes";
import burgerbuilder from "../../api/burgerbuilder";

export const successForm = () => {
    return {
        type: actionTypes.SUCCESS_FORM,
    };
};

export const failForm = (payload) => {
    return {
        type: actionTypes.FAIL_FORM,
        payload,
    };
};

export const loadForm = () => {
    return {
        type: actionTypes.LOAD_FORM,
    };
};

export const unloadForm = () => {
    return {
        type: actionTypes.UNLOAD_FORM,
    };
};
export const submitForm = (payload, history) => async (dispatch) => {
    try {
        dispatch(loadForm());
        await burgerbuilder.post("/orders.json", payload);

        dispatch(unloadForm());
        dispatch(successForm());
        setTimeout(() => {
            history.push("/");
        }, 2000);
    } catch (err) {
        dispatch(unloadForm());
        dispatch(failForm(err.message));
    }
};
