import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case "textarea":
            inputElement = <textarea {...props} className={classes.InputElement} />;
            break;
            case "select":
                inputElement = <select {...props}></select>
                break;
        default:
            inputElement = <input {...props} className={classes.InputElement} />;
    }
    return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;
