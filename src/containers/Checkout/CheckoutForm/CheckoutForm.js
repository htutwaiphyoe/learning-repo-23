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
                validations: {
                    required: true,
                    minLength: 3,
                },
                value: "",
                valid: false,
                touch: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your Email",
                    required: true,
                },
                validations: {
                    required: true,
                },
                value: "",
                valid: false,
            },
            phone: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    name: "phone",
                    placeholder: "Your Phone",
                    required: true,
                },
                validations: {
                    minLength: 7,
                    maxLength: 11,
                },
                value: "",
                valid: false,
                touch: false,
            },
            address: {
                elementType: "textarea",
                elementConfig: {
                    name: "address",
                    placeholder: "Your Address",
                    rows: "5",
                    required: true,
                },
                validations: {
                    required: true,
                    minLength: 5,
                },
                value: "",
                valid: false,
                touch: false,
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
                validations: {},
                valid: true,
            },
        },
        valid: false,
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
    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules?.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules?.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules?.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    };
    onInputChange = (e, type) => {
        const value = e.target.value;
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[type] };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidation(
            updatedFormElement.value,
            updatedFormElement.validations
        );
        updatedFormElement.touch = true;
        updatedOrderForm[type] = updatedFormElement;
        let formValid = true;
        for (let i in updatedOrderForm) {
            formValid = formValid && updatedOrderForm[i].valid;
        }
        this.setState({ orderForm: updatedOrderForm, valid: formValid });
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
                            invalid={!input.config.valid}
                            validations={input.config.validations}
                            touch={input.config.touch}
                            onInputChange={(e) => this.onInputChange(e, input.id)}
                        />
                    ))}
                    <Button type="Success" disabled={!this.state.valid}>
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
