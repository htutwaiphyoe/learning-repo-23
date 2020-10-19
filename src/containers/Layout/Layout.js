import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <SideDrawer />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
