import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import burgerbuilder from "../../../api/burgerbuilder";
import classes from "./CheckoutForm.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Message from "../../../components/UI/Message/Message";
import Input from "../../../components/UI/Input/Input";
class CheckoutForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Your Name",
                    required: true,
                },
                value: "",
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your Email",
                    required: true,
                },
                value: "",
            },
            phone: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "phone",
                    placeholder: "Your Phone",
                    required: true,
                },
                value: "",
            },
            address: {
                elementType: "textarea",
                elementConfig: {
                    name: "address",
                    placeholder: "Your Address",
                    rows: "5",
                    required: true,
                },
                value: "",
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
            },
        },
        loading: false,
        error: null,
        success: false,
    };
    onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            this.setState({ loading: true });
            const customer = {};
            for (let key in this.state.orderForm) {
                customer[key] = this.state.orderForm[key].value;
            }
            await burgerbuilder.post("/orders.json", {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer,
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
    onInputChange = (e, type) => {
        const value = e.target.value;
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[type] };
        updatedFormElement.value = value;
        updatedOrderForm[type] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    };
    render() {
        const formInputs = [];
        for (let key in this.state.orderForm) {
            formInputs.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let component = (
            <React.Fragment>
                <h1>Fill your contact info</h1>
                <form onSubmit={this.onFormSubmit}>
                    {formInputs.map((input) => (
                        <Input
                            key={input.id}
                            inputtype={input.config.elementType}
                            config={input.config.elementConfig}
                            value={input.config.value}
                            onInputChange={(e) => this.onInputChange(e, input.id)}
                        />
                    ))}
                    <Button type="Success">Order</Button>
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
