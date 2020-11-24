import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
    const [shownSideDrawer, setShowSideDrawer] = useState(false);

    const onClickHandler = useCallback(() => {
        setShowSideDrawer((prevState) => !prevState);
    }, []);

    return (
        <React.Fragment>
            <Toolbar onClickHandler={onClickHandler} token={props.token} />
            <SideDrawer
                shownSideDrawer={shownSideDrawer}
                onClickHandler={onClickHandler}
                token={props.token}
            />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        token: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);
