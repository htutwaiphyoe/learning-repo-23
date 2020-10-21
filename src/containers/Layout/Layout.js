import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
