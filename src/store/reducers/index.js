import { combineReducers } from "redux";
import burgerbuilderReducer from "./burgerbuilder";
const rootReducer = combineReducers({
    burgerbuilder: burgerbuilderReducer,
});

export default rootReducer;
