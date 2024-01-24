import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch(
        "https://arthurfrost.qflo.co.za/php/getTimeline.php"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  fetchData();

  return <div className="App"></div>;
}

export default App;
