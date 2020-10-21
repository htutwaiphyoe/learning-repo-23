import React from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import burgerbuilder from "../../api/burgerbuilder";
const INGREDIENT_PRICE = {
    Salad: 0.4,
    Bacon: 0.7,
    Cheese: 0.5,
    Meat: 1.5,
};
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0,
        },
        price: 2,
        purchasable: false,
        shownModal: false,
        loading: false,
    };
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
    onContinueHandler = async () => {
        try {
            this.setState({
                loading: true,
            });
            const response = await burgerbuilder.post("/orders.json", {
                ingredients: this.state.ingredients,
                price: this.state.price,
            });
            this.setState({ loading: false });
            console.log(response);
        } catch (e) {
            alert(e.message);
        }
    };
    render() {
        let disabled = { ...this.state.ingredients };
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.shownModal} onShowModal={this.onShowModalHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        onShowModal={this.onShowModalHandler}
                        show={this.state.shownModal}
                        onContinue={this.onContinueHandler}
                        loading={this.state.loading}
                    />
                </Modal>

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
}

export default BurgerBuilder;
