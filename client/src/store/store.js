import { createStore } from "redux";
import rootReducer from "./reducers"; // Ваш корневой редуктор

const store = createStore(rootReducer);

export default store;
