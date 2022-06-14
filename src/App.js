import { useEffect, useState } from "react";
import styled from "styled-components";

import Heading from "./components/Heading";

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [shoppingList, setShoppingList] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem("shoppingList");
    const converted = JSON.parse(valueFromLocalStorage) || [];
    return converted;
  });

  useEffect(() => {
    fetch("https://fetch-me.vercel.app/api/shopping/items")
      .then((data) => data.json())
      .then((items) => {
        setItems(items.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  function handleOnChange(event) {
    const newInput = event.target.value;
    setInput(newInput);
  }

  function handleOnSaveShoppingItem(item) {
    const foundShoppingItem = shoppingList.filter(
      (shoppingItem) => shoppingItem._id === item._id
    );
    if (foundShoppingItem.length === 0) {
      setShoppingList([...shoppingList, item]);
    }
  }

  function removeItem(id) {
    setShoppingList(
      shoppingList.filter((shoppingItem) => shoppingItem._id !== id)
    );
  }

  const foundItems = items.filter((item) =>
    item.name.en.toLowerCase().includes(input.toLowerCase())
  );

  console.log(foundItems);
  return (
    <AppContainer>
      <Heading />

      <ul>
        {shoppingList.map((shoppingItem) => (
          <ShoppingItem key={shoppingItem._id}>
            <Button onClick={() => removeItem(shoppingItem._id)}>
              {shoppingItem.name.de}
            </Button>
          </ShoppingItem>
        ))}
      </ul>
      <Form>
        <input
          onChange={handleOnChange}
          value={input}
          placeholder="Search here"
        />{" "}
      </Form>
      <ListenContainer>
        {foundItems.length === 0
          ? "Oops, we could not find anything."
          : foundItems.map((item) => (
              <li key={item._id}>
                <Button onClick={() => handleOnSaveShoppingItem(item)}>
                  {item.name.de}
                </Button>
              </li>
            ))}
      </ListenContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 2rem;
`;

const ListenContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ShoppingItem = styled.li`
  list-style: none;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: lightgreen;
  border-radius: 10px;
`;

const Form = styled.form`
  margin: 1rem;
  padding: 1rem;
`;
