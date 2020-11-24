import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { Redirect } from "react-router-dom";
const Logout = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionCreators.logout());
    }, [dispatch]);

    return <Redirect to="/" />;
};

export default Logout;
