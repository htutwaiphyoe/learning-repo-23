import { combineReducers } from "redux";
import burgerbuilderReducer from "./burgerbuilder";
import formReducer from "./form";
import ordersReducer from "./orders";
const rootReducer = combineReducers({
    burgerbuilder: burgerbuilderReducer,
    form: formReducer,
    orders: ordersReducer,
});

export default rootReducer;
