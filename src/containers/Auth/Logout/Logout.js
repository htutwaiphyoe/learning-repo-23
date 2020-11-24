import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { Redirect } from "react-router-dom";
const Logout = (props) => {
    useEffect(() => {
        props.logout();
    }, []);

    return <Redirect to="/" />;
};
const mapDispatchToProps = {
    logout: actionCreators.logout,
};
export default connect(null, mapDispatchToProps)(Logout);
