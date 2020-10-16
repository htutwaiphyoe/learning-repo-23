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
        />
    ));
    return <div className={classes.BurgerControls}>{burgerControls}</div>;
};

export default BurgerControls;
