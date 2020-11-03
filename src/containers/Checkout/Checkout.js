import React from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
class Checkout extends React.Component {
    state = {
        ingredients: null,
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        console.log(ingredients);
        this.setState({ ingredients });
    }
    onCheckOutCancel = () => {
        this.props.history.replace("/");
    };
    onCheckOutContinue = () => {
        this.props.history.replace("/checkout/orderform");
    };
    render() {
        let component = null;
        if (this.state.ingredients) {
            component = (
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckOutContinue={this.onCheckOutContinue}
                    onCheckOutCancel={this.onCheckOutCancel}
                />
            );
        }
        return <div>{component}</div>;
    }
}

export default Checkout;
