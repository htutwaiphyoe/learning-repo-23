import React from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./BurgerBuilder.module.css";
import Message from "../../components/UI/Message/Message";
import * as actionCreators from "../../store/actions";

class BurgerBuilder extends React.Component {
    state = {
        purchasable: false,
        shownModal: false,
        loading: false,
        error: null,
    };
    // loadIngredients = async () => {
    //     try {
    //         const response = await burgerbuilder.get("/ingredients.json");
    //         this.setState({ ingredients: response.data });
    //     } catch (err) {
    //         this.setState({
    //             error: {
    //                 type: "LOAD_INGREDIENTS",
    //                 message: err.message,
    //             },
    //         });
    //     }
    // };
    // componentDidMount() {
    //     this.loadIngredients();
    // }
    onShowModalHandler = () => {
        this.setState((state, props) => {
            return {
                shownModal: !state.shownModal,
            };
        });
    };
    purchasableHandler = (ingredients) => {
        let sum = 0;
        for (let key of Object.keys(ingredients)) {
            sum += ingredients[key];
        }
        return sum === 0 ? false : true;
    };
    onContinueHandler = () => {
        let queryParams = [];
        // use encodeURIComponent to transform valid components for URLSearchParams
        for (let i in this.props.ingredients) {
            queryParams.push(
                `${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`
            );
        }
        queryParams.push(
            `${encodeURIComponent("price")}=${encodeURIComponent(this.props.price.toFixed(2))}`
        );
        this.props.history.push({
            pathname: "/checkout",
            search: `?${queryParams.join("&")}`,
        });
    };
    render() {
        let disabled = { ...this.props.ingredients };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        let orderSummary = null;
        let burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Spinner />
            </div>
        );
        if (this.props.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    onShowModal={this.onShowModalHandler}
                    show={this.state.shownModal}
                    onContinue={this.onContinueHandler}
                />
            );
            burgerbuilder = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BurgerControls
                        onMoreButtonClick={this.props.addIngredient}
                        onLessButtonClick={this.props.removeIngredient}
                        disabled={disabled}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        onShowModal={this.onShowModalHandler}
                    />
                </React.Fragment>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        if (this.state.error) {
            burgerbuilder = (
                <div className={classes.BurgerBuilder}>
                    <Message type="Error">{this.state.error.message}</Message>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Modal show={this.state.shownModal} onShowModal={this.onShowModalHandler}>
                    {orderSummary}
                </Modal>
                {burgerbuilder}
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.price,
    };
};
const mapDispatchToProps = {
    addIngredient: actionCreators.addIngredient,
    removeIngredient: actionCreators.removeIngredient,
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
