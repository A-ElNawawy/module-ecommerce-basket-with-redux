import { createStore } from "redux";

const initialState = {
  BasketItems: [],
};

const basketReducer = (state = initialState, action) => {
  if (action.type === "basket") {
    return {
      BasketItems: [...action.payload],
    };
  }
  return state;
};

const store = createStore(basketReducer);

export default store;
