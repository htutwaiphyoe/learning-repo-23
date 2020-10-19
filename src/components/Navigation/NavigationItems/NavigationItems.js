import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>
                BurgerBuilder
            </NavigationItem>
            <NavigationItem link="/">Orders</NavigationItem>
            <NavigationItem link="/">Authentication</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
