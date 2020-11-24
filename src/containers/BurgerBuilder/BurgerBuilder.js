import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    const dispatch = useDispatch();
    const addIngredient = (payload) => dispatch(actionCreators.addIngredient(payload));
    const removeIngredient = (payload) => dispatch(actionCreators.removeIngredient(payload));
    const checkBuilding = () => dispatch(actionCreators.checkBuilding());
    const ingredients = useSelector((state) => state.burgerbuilder.ingredients);
    const price = useSelector((state) => state.burgerbuilder.price);
    const error = useSelector((state) => state.burgerbuilder.error);
    const loading = useSelector((state) => state.burgerbuilder.loading);
    const token = useSelector((state) => state.auth.token !== null);

    useEffect(() => {
        dispatch(actionCreators.initIngredients());
    }, [dispatch]);

    const onShowModalHandler = () => {
        setShownModal((prevState) => !prevState);
    };
    const purchasableHandler = () => {
        let sum = 0;
        for (let key of Object.keys(ingredients)) {
            sum += ingredients[key];
        }
        return sum === 0 ? false : true;
    };
    const onContinueHandler = () => {
        props.history.push("/checkout");
    };

    let disabled = { ...ingredients };
    for (let key in disabled) {
        disabled[key] = disabled[key] <= 0;
    }
    let orderSummary = null;
    let burgerbuilder = null;
    if (ingredients) {
        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                price={price}
                onShowModal={onShowModalHandler}
                show={shownModal}
                onContinue={onContinueHandler}
            />
        );
        burgerbuilder = (
            <React.Fragment>
                <Burger ingredients={ingredients} />
                <BurgerControls
                    onMoreButtonClick={addIngredient}
                    onLessButtonClick={removeIngredient}
                    disabled={disabled}
                    price={price}
                    purchasable={purchasableHandler()}
                    onShowModal={onShowModalHandler}
                    isAuth={token}
                    checkBuilding={checkBuilding}
                />
            </React.Fragment>
        );
    }
    if (loading) {
        burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Spinner />
            </div>
        );
    }
    if (error) {
        burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Message type="Error">{error}</Message>
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

export default BurgerBuilder;
