import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import data from "./dummy_data.json";

function App() {
  const dispatch = useDispatch();

  const BasketItems = useSelector((state) => state.BasketItems);
  //const [BasketItems, setBasketItems] = useState([]);

  const [Data /*setData*/] = useState(data);

  const addItemHandler = (addedItem) => {
    const internalBasketItems = [...BasketItems];

    let existingItem = internalBasketItems.find(
      (item) => item.id === addedItem.id
    );

    if (existingItem) {
      let existingItemIndex = internalBasketItems.indexOf(existingItem);

      existingItem.qty = existingItem.qty + 1;
      existingItem.totPrice = existingItem.qty * existingItem.price;
      internalBasketItems[existingItemIndex] = existingItem;
    } else {
      internalBasketItems.push({
        id: addedItem.id,
        title: addedItem.title,
        price: addedItem.price,
        qty: 1,
        totPrice: addedItem.price,
      });
    }
    dispatch({ type: "basket", payload: [...internalBasketItems] });
    //setBasketItems([...internalBasketItems]);
  };

  const decreaseItemHandler = (removedItem) => {
    const internalBasketItems = [...BasketItems];

    let existingItem = internalBasketItems.find(
      (item) => item.id === removedItem.id
    );

    let existingItemIndex = internalBasketItems.indexOf(removedItem);

    if (existingItem.qty === 1) {
      internalBasketItems.splice(existingItemIndex, 1);
    } else {
      existingItem.qty = existingItem.qty - 1;
      existingItem.totPrice = existingItem.qty * existingItem.price;
      internalBasketItems[existingItemIndex] = existingItem;
    }

    dispatch({ type: "basket", payload: [...internalBasketItems] });
    //setBasketItems([...internalBasketItems]);
  };

  const removeItemHandler = (removedItem) => {
    const internalBasketItems = [...BasketItems];

    let existingItemIndex = internalBasketItems.indexOf(removedItem);

    internalBasketItems.splice(existingItemIndex, 1);

    dispatch({ type: "basket", payload: [...internalBasketItems] });
  };

  //console.log(BasketItems);

  const menuList = Data.items.map((item) => (
    <li key={item.id}>
      <h3>{item.title}</h3>
      <h2>${item.price}</h2>
      <button onClick={() => addItemHandler(item)}>Add</button>
      <button
        onClick={() => removeItemHandler(item)}
        disabled={
          BasketItems.find((BasketItem) => BasketItem.id === item.id) ===
          undefined
        }
      >
        Remove
      </button>
    </li>
  ));

  const basketItemsList = BasketItems.map((item) => (
    <li key={item.id}>
      <h3>{item.title}</h3>
      <h2>${item.price}</h2>
      <h2>
        Qty: <span>{item.qty}</span>
      </h2>
      <h2>
        Tot: <span>{item.totPrice}</span>
      </h2>
      <button onClick={() => addItemHandler(item)}>+</button>
      <button
        onClick={() => decreaseItemHandler(item)}
        disabled={
          BasketItems.find((BasketItem) => BasketItem.id === item.id) ===
          undefined
        }
      >
        -
      </button>
      <button onClick={() => removeItemHandler(item)}>Remove</button>
    </li>
  ));

  let grandTotal = 0;

  BasketItems.forEach((item) => {
    grandTotal = grandTotal + item.totPrice;
  });

  return (
    <div className='App'>
      <ul className='menu'>
        Menu:
        {menuList}
      </ul>
      <div className='basket'>
        Basket:
        <ul>
          {basketItemsList}

          <li className='total'>
            <hr />
            <h2>
              GrandTot: <span>${grandTotal}</span>
            </h2>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
