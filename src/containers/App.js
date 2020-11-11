import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
import * as actionCreators from "../store/actions";
const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Orders = React.lazy(() => import("./Orders/Orders"));
const Auth = React.lazy(() => import("./Auth/Auth"));
const Logout = React.lazy(() => import("./Auth/Logout/Logout"));
class App extends React.Component {
    componentDidMount() {
        this.props.checkLocalstorage();
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={BurgerBuilder} />
                            <Suspense
                                fallback={
                                    <div style={{ margin: "20rem auto" }}>
                                        <Spinner />
                                    </div>
                                }
                            >
                                <Route path="/orders" exact component={Orders} />
                                <Route path="/checkout" component={Checkout} />
                                <Route path="/auth" component={Auth} />
                                <Route path="/logout" exact component={Logout} />
                            </Suspense>
                        </Switch>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token !== null,
    };
};
const mapDispatchToProps = {
    checkLocalstorage: actionCreators.checkLocalstorage,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
