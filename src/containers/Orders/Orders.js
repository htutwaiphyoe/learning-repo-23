import React from "react";
import burgerbuilder from "../../api/burgerbuilder";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/UI/Message/Message";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";

class Orders extends React.Component {
    state = {
        orders: [],
        loading: false,
        error: false,
    };
    componentDidMount() {
        this.getOrders();
    }
    getOrders = async () => {
        try {
            this.setState({ loading: true });
            const response = await burgerbuilder.get("/orders.json");
            let orders = [];
            for (let i in response.data) {
                orders.push({ id: i, ...response.data[i] });
            }

            this.setState({ orders, loading: false });
        } catch (err) {
            this.setState({ loading: false, error: err.message });
        }
    };
    show() {
        let components = this.state.orders.map((order) => <Order order={order} key={order.id} />);
        if (this.state.loading) {
            components = (
                <div className={classes.Orders}>
                    <Spinner />
                </div>
            );
        }
        if (this.state.error) {
            components = <Message type="Error">{this.state.error}</Message>;
        }
        return components;
    }
    render() {
        return <div>{this.show()}</div>;
    }
}

export default Orders;
