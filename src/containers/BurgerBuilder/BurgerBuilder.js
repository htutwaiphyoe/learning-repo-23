import React from "react";
import Burger from "../../components/Burger/Burger";
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            Salad: 1,
            Bacon: 1,
            Cheese: 1,
            Meat: 1,
        },
    };
    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
