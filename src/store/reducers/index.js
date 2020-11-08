import { combineReducers } from "redux";
import burgerbuilderReducer from "./burgerbuilder";
import formReducer from "./form";
const rootReducer = combineReducers({
    burgerbuilder: burgerbuilderReducer,
    form: formReducer,
});

export default rootReducer;
