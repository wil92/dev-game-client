import { createStore } from "redux";
import authReducer from "./auth/reducer";

export default createStore(authReducer);
