import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  console.log(data)
  useEffect(() => {
    fetchAPI()
  },
    [data == ""])
  const url = "http://localhost:8000/server.php";
  const fetchAPI = async () => {
    const res = await axios.get(url);
    return setData(res.data);
  };
  return (
    <div className="App">
      {data.name}
    </div>
  );
}

export default App;
