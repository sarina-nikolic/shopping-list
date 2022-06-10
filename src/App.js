import { useEffect, useState } from "react";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppingList();
    async function loadShoppingList() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data = await response.json();
        setShoppingList(data.results);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}
