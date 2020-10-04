import { createStore, combineReducers } from "redux";
import modalReducer from "./reducers/modal";
import modalInfoReducer from "./reducers/modalInfo";
import searchReducer from "./reducers/search";
let rootReducer = combineReducers({
  modal: modalReducer,
  modalInfo: modalInfoReducer,
  search: searchReducer,
});

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
