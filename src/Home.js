import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
export default function Home() {
    const [data, setData] = useState("");

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
                    <Link to={'/add-product'}><button>ADD</button></Link>
                    <button className='.delete-checkbox'>MASS DELETE</button>
                </div>
            </div>
            <hr></hr>
            {data && (
                <div id="products">
                    <div>
                        <div>
                            {data[1]}
                        </div>
                        <div>
                            {data[1]}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}