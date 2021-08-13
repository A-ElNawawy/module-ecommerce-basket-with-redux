import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import data from "./dummy_data.json";

function App() {
  const dispatch = useDispatch();

  const BasketItems = useSelector((state) => state.BasketItems);
  const [Data /*setData*/] = useState(data);

  const addItemHandler = (addedItem) => {
    dispatch({ type: "addItem", addedItem: addedItem });
  };

  const decreaseItemHandler = (decreasedItem) => {
    dispatch({ type: "decreaseItem", decreasedItem: decreasedItem });
  };

  const removeItemHandler = (removedItem) => {
    dispatch({ type: "removeItem", removedItem: removedItem });
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
