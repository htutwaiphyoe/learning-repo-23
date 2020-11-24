import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/UI/Message/Message";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import * as actionCreators from "../../store/actions";
const Orders = (props) => {
    const orders = useSelector((state) => state.orders.orders);
    const error = useSelector((state) => state.orders.error);
    const loading = useSelector((state) => state.orders.loading);
    const token = useSelector((state) => state.auth.token);
    const userid = useSelector((state) => state.auth.user.id);

    const dispatch = useDispatch();
    const fetchOrders = useCallback(() => dispatch(actionCreators.fetchOrders(token, userid)), [
        dispatch,
        token,
        userid,
    ]);
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const show = () => {
        let components = orders.map((order) => <Order order={order} key={order.id} />);
        if (orders.length === 0) {
            components = <Message type="Normal">No Orders</Message>;
        }
        if (loading) {
            components = (
                <div className={classes.Orders}>
                    <Spinner />
                </div>
            );
        }
        if (error) {
            components = <Message type="Error">{props.error}</Message>;
        }
        return components;
    };

    return <div>{show()}</div>;
};

export default Orders;
