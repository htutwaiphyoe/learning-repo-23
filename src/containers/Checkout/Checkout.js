import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
class Checkout extends React.Component {
    state = {
        ingredients: null,
        price: 0,
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients, price });
    }
    onCheckOutCancel = () => {
        this.props.history.replace("/");
    };
    onCheckOutContinue = () => {
        this.props.history.replace("/checkout/form");
    };
    render() {
        let component = null;
        if (this.state.ingredients) {
            component = (
                <React.Fragment>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        onCheckOutContinue={this.onCheckOutContinue}
                        onCheckOutCancel={this.onCheckOutCancel}
                    />
                    <Route
                        path={`${this.props.match.url}/form`}
                        render={() => (
                            <CheckoutForm
                                ingredients={this.state.ingredients}
                                price={this.state.price}
                            />
                        )}
                    />
                </React.Fragment>
            );
        }
        return <div>{component}</div>;
    }
}

export default Checkout;
