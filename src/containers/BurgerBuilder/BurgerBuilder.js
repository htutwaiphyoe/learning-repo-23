import React from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import burgerbuilder from "../../api/burgerbuilder";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./BurgerBuilder.module.css";
const INGREDIENT_PRICE = {
    Salad: 0.4,
    Bacon: 0.7,
    Cheese: 0.5,
    Meat: 1.5,
};
class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        price: 2,
        purchasable: false,
        shownModal: false,
        loading: false,
        error: null,
    };
    loadIngredients = async () => {
        try {
            const response = await burgerbuilder.get("/ingredients.json");
            this.setState({ ingredients: response.data });
        } catch (err) {
            this.setState({
                error: {
                    type: "LOAD_INGREDIENTS",
                    message: err.message,
                },
            });
        }
    };
    componentDidMount() {
        this.loadIngredients();
    }
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
    onMoreButtonClick = (type) => {
        const ingredients = { ...this.state.ingredients };
        ingredients[type] += 1;
        const oldPrice = this.state.price;
        const price = oldPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients,
            price,
            purchasable: this.purchasableHandler(ingredients),
        });
    };
    onLessButtonClick = (type) => {
        const ingredients = { ...this.state.ingredients };
        if (ingredients[type] > 0) {
            ingredients[type] -= 1;
            const oldPrice = this.state.price;
            const price = oldPrice - INGREDIENT_PRICE[type];
            this.setState({
                ingredients,
                price,
                purchasable: this.purchasableHandler(ingredients),
            });
        }
    };
    onContinueHandler = () => {
        this.props.history.push({
            pathname: "/checkout",
            search: `?Salad=${this.state.ingredients.Salad}&Bacon=${this.state.ingredients.Bacon}&Meat=${this.state.ingredients.Meat}&Cheese=${this.state.ingredients.Cheese}`,
        });
        // try {
        //     this.setState({ loading: true });
        //     await burgerbuilder.post("/orders.json", {
        //         ingredients: this.state.ingredients,
        //         price: this.state.price,
        //     });

        //     this.setState({
        //         loading: false,
        //         shownModal: false,
        //         ingredients: { ...this.state.ingredients, Salad: 0, Bacon: 0, Cheese: 0, Meat: 0 },
        //         price: 2,
        //         purchasable: false,
        //     });
        // } catch (err) {
        //     this.setState({
        //         loading: false,
        //         error: {
        //             type: "POST_ORDER",
        //             message: err.message,
        //         },
        //     });
        // }
    };
    render() {
        let disabled = { ...this.state.ingredients };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        let orderSummary = null;
        let burgerbuilder = (
            <div className={classes.BurgerBuilder}>
                <Spinner />
            </div>
        );
        if (this.state.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.price}
                    onShowModal={this.onShowModalHandler}
                    show={this.state.shownModal}
                    onContinue={this.onContinueHandler}
                />
            );
            burgerbuilder = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls
                        onMoreButtonClick={this.onMoreButtonClick}
                        onLessButtonClick={this.onLessButtonClick}
                        disabled={disabled}
                        price={this.state.price}
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
            if (this.state.error.type === "LOAD_INGREDIENTS") {
                burgerbuilder = (
                    <div className={classes.BurgerBuilder}>
                        <p className={classes.Error}>{this.state.error.message}</p>
                    </div>
                );
            } else if (this.state.error.type === "POST_ORDER") {
                orderSummary = <p className={classes.Error}>{this.state.error.message}</p>;
            }
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

export default BurgerBuilder;
