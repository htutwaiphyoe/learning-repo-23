import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
    const [shownSideDrawer, setShowSideDrawer] = useState(false);
    const token = useSelector((state) => state.auth.token !== null);
    const onClickHandler = useCallback(() => {
        setShowSideDrawer((prevState) => !prevState);
    }, []);

    return (
        <React.Fragment>
            <Toolbar onClickHandler={onClickHandler} token={token} />
            <SideDrawer
                shownSideDrawer={shownSideDrawer}
                onClickHandler={onClickHandler}
                token={token}
            />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default Layout;
