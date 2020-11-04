import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import burgerbuilder from "../../../api/burgerbuilder";
import classes from "./CheckoutForm.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Message from "../../../components/UI/Message/Message";
class CheckoutForm extends Component {
    state = {
        customer: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
        loading: false,
        error: null,
        success: false,
    };
    onOrderClick = async (e) => {
        e.preventDefault();
        try {
            this.setState({ loading: true });
            await burgerbuilder.post("/orders.json", {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: this.state.customer,
            });

            this.setState({
                loading: false,
                success: true,
            });
            setTimeout(() => {
                this.props.history.replace("/");
            }, 1000);
        } catch (err) {
            this.setState({
                loading: false,
                error: {
                    type: "POST_ORDER",
                    message: err.message,
                },
            });
        }
    };
    render() {
        let component = (
            <React.Fragment>
                <h1>Fill your contact info</h1>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <Button type="Success" onButtonClick={this.onOrderClick}>
                        Order
                    </Button>
                </form>
            </React.Fragment>
        );
        if (this.state.loading) {
            component = <Spinner />;
        }
        if (this.state.error) {
            component = <Message type="Error">{this.state.error.message}</Message>;
        }
        if (this.state.success) {
            component = <Message type="Success">Your order successfully completed</Message>;
        }
        return <div className={classes.CheckoutForm}>{component}</div>;
    }
}

export default withRouter(CheckoutForm);
