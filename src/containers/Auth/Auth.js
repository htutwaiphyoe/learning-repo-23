import React from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actionCreators from "../../store/actions";
class Auth extends React.Component {
    state = {
        authForm: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                    required: true,
                },
                value: "",
                validations: {},
                valid: true,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    name: "password",
                    placeholder: "Password",
                    required: true,
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touch: false,
            },
        },
        isSignUp: true,
    };
    checkValidation = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        return isValid;
    };
    onInputChange = (e, type) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [type]: {
                ...this.state.authForm[type],
                value: e.target.value,
                valid: this.checkValidation(e.target.value, this.state.authForm[type].validations),
                touch: true,
            },
        };
        this.setState({ authForm: updatedAuthForm });
    };
    onSwitchAuthMode = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp,
            };
        });
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.auth(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignUp
        );
    };
    render() {
        const formElements = [];
        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key],
            });
        }
        let error = null;
        if (this.props.error) {
            error = <p className={classes.Error}>{this.props.error.message}</p>;
        }
        let component = (
            <React.Fragment>
                <h1>Sign {this.state.isSignUp ? "Up" : "In"} Here</h1>
                {error}
                <form onSubmit={this.onFormSubmit}>
                    {formElements.map((e) => (
                        <Input
                            key={e.id}
                            type={e.config.elementType}
                            config={e.config.elementConfig}
                            value={e.config.value}
                            invalid={!e.config.valid}
                            touch={e.config.touch}
                            onInputChange={(event) => this.onInputChange(event, e.id)}
                        />
                    ))}
                    <Button type="Success">Sign {this.state.isSignUp ? "Up" : "In"}</Button>
                </form>
                <p onClick={this.onSwitchAuthMode}>
                    {this.state.isSignUp
                        ? "Already have an account? Sign Up"
                        : "Do not have an account? Sign In"}
                </p>
            </React.Fragment>
        );
        if (this.props.loading) {
            component = <Spinner />;
        }

        return <div className={classes.Auth}>{component}</div>;
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};
const mapDispatchToProps = {
    auth: actionCreators.auth,
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
