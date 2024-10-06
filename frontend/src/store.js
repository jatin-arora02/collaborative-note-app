import { createStore, combineReducers, applyMiddleware } from "redux";
import { default as thunk } from "redux-thunk"; // Import thunk as default
import { composeWithDevTools } from "redux-devtools-extension"; // Optional: For Redux DevTools
import { noteReducer } from "./reducers/noteReducer"; // Your reducer

const rootReducer = combineReducers({
  notes: noteReducer,
});

// Use composeWithDevTools to add thunk as middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Ensure thunk is included correctly
);

export default store;
