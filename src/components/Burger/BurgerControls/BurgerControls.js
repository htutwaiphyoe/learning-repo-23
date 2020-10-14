import React from "react";
import classes from "./BurgerControls.module.css";
import BurgerControl from "./BurgerControl/BurgerControl";

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
            <button className={classes.OrderButton} disabled={!props.purchasable}>
                Order Now
            </button>
        </div>
    );
};

export default BurgerControls;
