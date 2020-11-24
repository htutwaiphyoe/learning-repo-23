import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} onShow={props.onShowModal}></Backdrop>

            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-200vh)",
                    opacity: props.show ? "1" : "0",
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default React.memo(
    Modal,
    (prevState, nextProps) =>
        prevState.show === nextProps.show || prevState.children === nextProps.children
);
