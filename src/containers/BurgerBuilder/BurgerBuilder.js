import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./BurgerBuilder.module.css";
import Message from "../../components/UI/Message/Message";
import * as actionCreators from "../../store/actions";

export const BurgerBuilder = (props) => {
    const [shownModal, setShownModal] = useState(false);
    const { initIngredients } = props;
    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const onShowModalHandler = () => {
        setShownModal((prevState) => !prevState);
    };
    const purchasableHandler = () => {
        let sum = 0;
        for (let key of Object.keys(props.ingredients)) {
            sum += props.ingredients[key];
        }
        return sum === 0 ? false : true;
    };
    const onContinueHandler = () => {
        props.history.push("/checkout");
    };

    let disabled = { ...props.ingredients };
    for (let key in disabled) {
        disabled[key] = disabled[key] <= 0;
    }
    let orderSummary = null;
    let burgerbuilder = null;
    if (props.ingredients) {
        orderSummary = (
            <OrderSummary
                ingredients={props.ingredients}
                price={props.price}
                onShowModal={onShowModalHandler}
                show={shownModal}
                onContinue={onContinueHandler}
            />
        );
        burgerbuilder = (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <BurgerControls
                    onMoreButtonClick={props.addIngredient}
                    onLessButtonClick={props.removeIngredient}
                    disabled={disabled}
                    price={props.price}
                    purchasable={purchasableHandler()}
                    onShowModal={onShowModalHandler}
                    isAuth={props.token}
                    checkBuilding={props.checkBuilding}
                />
            </React.Fragment>
        );
    }
    if (props.loading) {
        burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Spinner />
            </div>
        );
    }
    if (props.error) {
        burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Message type="Error">{props.error}</Message>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Modal show={shownModal} onShowModal={onShowModalHandler}>
                {orderSummary}
            </Modal>
            {burgerbuilder}
        </React.Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.price,
        error: state.burgerbuilder.error,
        loading: state.burgerbuilder.loading,
        token: state.auth.token !== null,
    };
};
const mapDispatchToProps = {
    addIngredient: actionCreators.addIngredient,
    removeIngredient: actionCreators.removeIngredient,
    initIngredients: actionCreators.initIngredients,
    checkBuilding: actionCreators.checkBuilding,
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
