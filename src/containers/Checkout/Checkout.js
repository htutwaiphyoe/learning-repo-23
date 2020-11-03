import React from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
class Checkout extends React.Component {
    state = {
        ingredients: {
            Salad: 1,
            Meat: 1,
            Bacon: 1,
            Cheese: 1,
        },
    };
    componentDidMount() {
        console.log(this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        for (let param in query.entries()) {
            console.log(param);
        }
    }
    onCheckOutCancel = () => {
        this.props.history.replace("/");
    };
    onCheckOutContinue = () => {
        this.props.history.replace("/checkout/orderform");
    };
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckOutContinue={this.onCheckOutContinue}
                    onCheckOutCancel={this.onCheckOutCancel}
                />
            </div>
        );
    }
}

export default Checkout;
