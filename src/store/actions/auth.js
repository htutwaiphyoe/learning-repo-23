import * as actionTypes from "./actionTypes";
import axios from "axios";
export const showAuthLoading = () => {
    return {
        type: actionTypes.SHOW_AUTH_LOADING,
    };
};

export const showError = (payload) => {
    return {
        type: actionTypes.SHOW_ERROR,
        payload,
    };
};
export const successAuth = (payload) => {
    return {
        type: actionTypes.SUCCESS_AUTH,
        payload,
    };
};

export const auth = (email, password, isSignUp) => async (dispatch) => {
    try {
        dispatch(showAuthLoading());
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPzyFa_HGilMMFSeS4jWUmvTQh8kkGzko";
        if (!isSignUp) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPzyFa_HGilMMFSeS4jWUmvTQh8kkGzko";
        }
        const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true,
        });
        console.log(response.data);
        dispatch(successAuth(response.data));
    } catch (err) {
        dispatch(showError(err.response.data.error));
    }
};
