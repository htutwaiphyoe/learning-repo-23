import React from "react";
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

export default NavigationItems;
