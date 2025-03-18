import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [fruits, setFruits] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await fetch("http://localhost:8080/api");
      const data = await response.json();
      setFruits(data.fruits);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    fetchApi();
  };

  if (fruits.length === 0) {
    return (
      <>
        <h1>No Fruits Yet!</h1>
        <button type="button" onClick={handleClick}>
          Get Fruit
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Fruits</h1>
      <ul>
        {fruits.map((fruit, index) => {
          return <li key={`fruit-${index}`}>{fruit}</li>;
        })}
      </ul>
      <button type="button" onClick={handleClick}>
        Refresh Fruit
      </button>
    </>
  );
}

export default App;
