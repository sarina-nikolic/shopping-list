import { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingItem from "./components/ShoppingItem";
import Heading from "./components/Heading";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppinglist();
    async function loadShoppinglist() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data1 = await response.json();
        setShoppingList(data1.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <AppContainer>
      <Heading />
      <ListenContainer>
        {shoppingList.map((item) => (
          <ShoppingItem key={item._id} name={item.name.de} />
        ))}
      </ListenContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 1rem;
`;

const ListenContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default App;
