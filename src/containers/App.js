import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
const Checkout = React.lazy(() => import("./Checkout/Checkout"));
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Suspense fallback={<Spinner />}>
                        <Layout>
                            <Switch>
                                <Route path="/" exact component={BurgerBuilder} />
                                <Route path="/checkout" component={Checkout} />
                            </Switch>
                        </Layout>
                    </Suspense>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
