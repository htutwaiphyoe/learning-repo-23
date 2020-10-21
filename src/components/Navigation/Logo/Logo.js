import React from "react";
import logo from "../../../assets/img/28.1 burger-logo.png.png";
import classes from "./Logo.module.css";
const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt="Burger Logo" />
        </div>
    );
};

export default Logo;
