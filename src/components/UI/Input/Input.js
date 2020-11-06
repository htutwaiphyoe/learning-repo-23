import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case "textarea":
            inputElement = (
                <textarea
                    {...props.config}
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.onInputChange}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.onInputChange}
                >
                    {props.config.options.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.config}
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.onInputChange}
                />
            );
    }
    return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;
