import React from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
    state = {
        shownSideDrawer: false,
    };

    onClickHandler = () => {
        this.setState((state, props) => {
            return {
                shownSideDrawer: !state.shownSideDrawer,
            };
        });
    };
    render() {
        return (
            <React.Fragment>
                <Toolbar onClickHandler={this.onClickHandler} />
                <SideDrawer
                    shownSideDrawer={this.state.shownSideDrawer}
                    onClickHandler={this.onClickHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
