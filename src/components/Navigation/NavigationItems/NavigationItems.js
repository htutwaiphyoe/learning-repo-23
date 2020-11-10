import React from "react";
import { connect } from "react-redux";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                BurgerBuilder
            </NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth" exact>
                SIGN UP
            </NavigationItem>
        </ul>
    );
};
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(NavigationItems);
