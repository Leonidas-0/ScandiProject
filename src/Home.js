import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
export default function Home() {
    const [data, setData] = useState("");
    console.log(data)

    useEffect(() => {
        FetchAPI()
    },
        [data === ""])
    const url = "http://localhost:8000/list.php";
    async function FetchAPI() {
        const res = await axios.get(url);
        setData(res.data)
        return false
    };
    return (
        <div>
            <div id="header">
                <h1>Product List</h1>
                <div id="addremove">
                    <Link to={'/add-product'}><Button variant="outlined">ADD</Button></Link>
                    <Button variant="outlined">MASS DELETE</Button>
                </div>
            </div>
            <hr></hr>
            {data && (
                <div id="products">
                    {data.map(product => <p>{product.sku}</p>)}
                </div>
            )}
        </div>
    )
}