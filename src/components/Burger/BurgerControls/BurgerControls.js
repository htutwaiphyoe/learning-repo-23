import React from "react";
import classes from "./BurgerControls.module.css";
import BurgerControl from "./BurgerControl/BurgerControl";
import PropTypes from "prop-types";
const controls = ["Salad", "Bacon", "Cheese", "Meat"];

const BurgerControls = (props) => {
    const burgerControls = controls.map((control) => (
        <BurgerControl
            label={control}
            key={control}
            onLessClick={() => props.onLessButtonClick(control)}
            onMoreClick={() => props.onMoreButtonClick(control)}
            disabled={props.disabled[control]}
        />
    ));
    return (
        <div className={classes.BurgerControls}>
            <p>Current price: ${props.price.toFixed(2)}</p>
            {burgerControls}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.onShowModal}
            >
                Order Now
            </button>
        </div>
    );
};

BurgerControls.propTypes = {
    onMoreButtonClick: PropTypes.func.isRequired,
    onLessButtonClick: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    purchasable: PropTypes.bool.isRequired,
    onShowModal: PropTypes.func.isRequired,
    disabled: PropTypes.object.isRequired,
};

export default BurgerControls;
