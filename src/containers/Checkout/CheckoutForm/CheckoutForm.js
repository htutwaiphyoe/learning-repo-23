import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutForm.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Message from "../../../components/UI/Message/Message";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions";
import { checkValidation } from "../../../utils/utils";
const CheckoutForm = (props) => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.burgerbuilder.ingredients);
    const price = useSelector((state) => state.burgerbuilder.price);
    const loading = useSelector((state) => state.form.loading);
    const error = useSelector((state) => state.form.error);
    const success = useSelector((state) => state.form.success);
    const token = useSelector((state) => state.auth.token);
    const userid = useSelector((state) => state.auth.user.id);
    const email = useSelector((state) => state.auth.user.email);
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
            value: email,
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
        dispatch(
            actionCreators.submitForm(
                {
                    ingredients: ingredients,
                    price: price,
                    customer,
                    userid: userid,
                },
                props.history,
                token
            )
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
    if (loading) {
        component = <Spinner />;
    }
    if (error) {
        component = <Message type="Error">{error}</Message>;
    }
    if (success) {
        component = <Message type="Success">Your order successfully completed</Message>;
    }
    return <div className={classes.CheckoutForm}>{component}</div>;
};

export default withRouter(CheckoutForm);
