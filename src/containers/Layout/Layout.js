import React from "react";
import classes from "./Layout.module.css";
class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header>Navigation</header>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
