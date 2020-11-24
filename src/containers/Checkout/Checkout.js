import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
    const onCheckOutCancel = () => {
        props.history.replace("/");
    };
    const onCheckOutContinue = () => {
        props.history.replace("/checkout/form");
    };

    let component = (
        <div className={classes.Checkout}>
            <Redirect to="/" />
        </div>
    );
    if (props.ingredients) {
        component = (
            <React.Fragment>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    onCheckOutContinue={onCheckOutContinue}
                    onCheckOutCancel={onCheckOutCancel}
                />
                <Route path={`${props.match.url}/form`} render={() => <CheckoutForm />} />
            </React.Fragment>
        );

        return <div>{component}</div>;
    }
};
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.price,
    };
};
export default connect(mapStateToProps)(Checkout);
