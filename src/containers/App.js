import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Orders = React.lazy(() => import("./Orders/Orders"));
const Auth = React.lazy(() => import("./Auth/Auth"));
class App extends React.Component {
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
                            </Suspense>
                        </Switch>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
