import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { Redirect } from "react-router-dom";
const Logout = (props) => {
    const { logout } = props;
    useEffect(() => {
        logout();
    }, [logout]);

    return <Redirect to="/" />;
};
const mapDispatchToProps = {
    logout: actionCreators.logout,
};
export default connect(null, mapDispatchToProps)(Logout);
