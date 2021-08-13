import { createStore } from "redux";

const initialState = {
  BasketItems: [],
};

const basketReducer = (state = initialState, action) => {
  if (action.type === "addItem") {
    const internalBasketItems = [...state.BasketItems];

    let existingItem = internalBasketItems.find(
      (item) => item.id === action.addedItem.id
    );

    if (existingItem) {
      let existingItemIndex = internalBasketItems.indexOf(existingItem);

      existingItem.qty = existingItem.qty + 1;
      existingItem.totPrice = existingItem.qty * existingItem.price;
      internalBasketItems[existingItemIndex] = existingItem;
    } else {
      internalBasketItems.push({
        id: action.addedItem.id,
        title: action.addedItem.title,
        price: action.addedItem.price,
        qty: 1,
        totPrice: action.addedItem.price,
      });
    }

    return {
      BasketItems: [...internalBasketItems],
    };
  }

  if (action.type === "decreaseItem") {
    const internalBasketItems = [...state.BasketItems];

    let existingItem = internalBasketItems.find(
      (item) => item.id === action.decreasedItem.id
    );

    let existingItemIndex = internalBasketItems.indexOf(action.decreasedItem);

    if (existingItem.qty === 1) {
      internalBasketItems.splice(existingItemIndex, 1);
    } else {
      existingItem.qty = existingItem.qty - 1;
      existingItem.totPrice = existingItem.qty * existingItem.price;
      internalBasketItems[existingItemIndex] = existingItem;
    }

    return {
      BasketItems: [...internalBasketItems],
    };
  }

  if (action.type === "removeItem") {
    const internalBasketItems = [...state.BasketItems];

    let existingItemIndex = internalBasketItems.indexOf(action.removedItem);

    internalBasketItems.splice(existingItemIndex, 1);

    return {
      BasketItems: [...internalBasketItems],
    };
  }

  return state;
};

const store = createStore(basketReducer);

export default store;
