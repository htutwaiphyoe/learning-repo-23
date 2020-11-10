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

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};

export const expireAuth = (expiresIn) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expiresIn * 1000);
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
        dispatch(successAuth(response.data));
        dispatch(expireAuth(response.data.expiresIn));
    } catch (err) {
        dispatch(showError(err.response.data.error));
    }
};
