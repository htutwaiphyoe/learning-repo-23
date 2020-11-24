import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutForm.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Message from "../../../components/UI/Message/Message";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions";
import { checkValidation } from "../../../utils/utils";
const CheckoutForm = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                name: "name",
                placeholder: "Your Name",
                required: true,
            },
            value: "",
            validations: {
                required: true,
                minLength: 3,
            },
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
            value: props.email,
            validations: {},
            valid: true,
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
            validations: {
                required: true,
                minLength: 10,
            },
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
            value: "",
            validations: {
                required: true,
                minLength: 5,
            },
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
    });
    const [valid, setValid] = useState(false);
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const customer = {};
        for (let key in orderForm) {
            customer[key] = orderForm[key].value;
        }
        props.submitForm(
            {
                ingredients: props.ingredients,
                price: props.price,
                customer,
                userid: props.userid,
            },
            props.history,
            props.token
        );
    };

    const onInputChange = (e, type) => {
        const updatedOrderForm = {
            ...orderForm,
            [type]: {
                ...orderForm[type],
                value: e.target.value,
                valid: checkValidation(e.target.value, orderForm[type].validations),
                touch: true,
            },
        };

        let formValid = true;
        for (let i in updatedOrderForm) {
            formValid = formValid && updatedOrderForm[i].valid;
        }
        setOrderForm(updatedOrderForm);
        setValid(formValid);
    };

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key],
        });
    }
    let component = (
        <React.Fragment>
            <h1>Fill your contact info</h1>
            <form onSubmit={onFormSubmit}>
                {formElements.map((e) => (
                    <Input
                        key={e.id}
                        type={e.config.elementType}
                        config={e.config.elementConfig}
                        value={e.config.value}
                        invalid={!e.config.valid}
                        touch={e.config.touch}
                        onInputChange={(event) => onInputChange(event, e.id)}
                    />
                ))}
                <Button type="Success" disabled={!valid}>
                    Order
                </Button>
            </form>
        </React.Fragment>
    );
    if (props.loading) {
        component = <Spinner />;
    }
    if (props.error) {
        component = <Message type="Error">{props.error}</Message>;
    }
    if (props.success) {
        component = <Message type="Success">Your order successfully completed</Message>;
    }
    return <div className={classes.CheckoutForm}>{component}</div>;
};
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.price,
        loading: state.form.loading,
        error: state.form.error,
        success: state.form.success,
        token: state.auth.token,
        userid: state.auth.user.id,
        email: state.auth.user.email,
    };
};
const mapDispatchToProps = {
    submitForm: actionCreators.submitForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutForm));
