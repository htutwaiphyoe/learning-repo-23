import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/UI/Message/Message";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import * as actionCreators from "../../store/actions";
const Orders = (props) => {
    const { fetchOrders, token, userid } = props;
    useEffect(() => {
        fetchOrders(token, userid);
    }, [fetchOrders, token, userid]);

    const show = () => {
        let components = props.orders.map((order) => <Order order={order} key={order.id} />);
        if (props.orders.length === 0) {
            components = <Message type="Normal">No Orders</Message>;
        }
        if (props.loading) {
            components = (
                <div className={classes.Orders}>
                    <Spinner />
                </div>
            );
        }
        if (props.error) {
            components = <Message type="Error">{props.error}</Message>;
        }
        return components;
    };

    return <div>{show()}</div>;
};
const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        error: state.orders.error,
        loading: state.orders.loading,
        token: state.auth.token,
        userid: state.auth.user.id,
    };
};
const mapDispatchToProps = {
    fetchOrders: actionCreators.fetchOrders,
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
