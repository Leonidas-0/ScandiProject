import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Add() {
    const navigate = useNavigate();
    function Validate() {
        setPleaseadd(null)
        setPleaseformat(null)
        setChangesku(null)
        FetchAPI()
        function checkifnum(num) {
            if (num !== "" && /^\d+$/.test(num) === false) {
                return true
            }
            else {
                return false
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].sku === sku) {
                setChangesku(true)
            }
            else {
                setChangesku(false)
            }
        }
        if ((sku === "" || name === "" || price === "") || (type === "dvd" && mb === "") || (type === 'book' && weight === "") || ((type === 'furniture') && (height === '' || width === "" || length === ""))) {
            setPleaseadd(true)
        }
        else {
            setPleaseadd(false)
        }
        if (Boolean(sku.match(/^[A-Za-z0-9]*$/)) === false || checkifnum(price) || checkifnum(height) || checkifnum(width) || checkifnum(length) || checkifnum(weight)) {
            setPleaseformat(true)
        }
        else {
            setPleaseformat(false)
        }
        // if (pleaseadd === false && pleaseformat === false && changesku === false) {
        //     navigate(`/`)
        // } 
    }
    const [sku, setSku] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [pleaseadd, setPleaseadd] = useState(null)
    const [type, setType] = useState("dvd")
    const [mb, setMb] = useState("")
    const [height, setHeight] = useState("")
    const [width, setWidth] = useState("")
    const [length, setLength] = useState("")
    const [weight, setWeight] = useState("")
    const [pleaseformat, setPleaseformat] = useState(null)
    const [data, setData] = useState("");
    const [changesku, setChangesku] = useState(null);

    useEffect(() => {
        setPleaseadd(null)
        setPleaseformat(null)
        setChangesku(null)
        setMb("")
        setHeight("")
        setWidth("")
        setLength("")
        setWeight("")
    }, [type])
    if (pleaseadd === false && pleaseformat === false && changesku === false) {
        navigate(`/`)
    }
    const url = "http://localhost:8000/list.php";
    async function FetchAPI() {
        const res = await axios.get(url);
        setData(res.data)
        return false
    };
    return (
        <div>
            <div id="header">
                <h1>Product Add</h1>
                <div id="addremove">
                    {/* <Link to={'/add-product'}>ADD</Link> */}
                    <button onClick={() => Validate()} className='.delete-checkbox'>Save</button>
                </div>
            </div>
            <hr></hr>
            <div id="product_form">
                <div id="baseinput">
                    <div id="labels">
                        <label for="sku">SKU</label>
                        <label for="name">Name</label>
                        <label for="price">Price</label>
                    </div>
                    <div id="inputs">
                        <input maxlength="10" onChange={(e) => setSku(e.target.value)} id="sku"></input>
                        <input maxlength="20" onChange={(e) => setName(e.target.value)} id="name"></input>
                        <input maxlength="10" onChange={(e) => setPrice(e.target.value)} id="price"></input>
                    </div>
                </div>
                <br></br>
                <select onChange={(e) => setType(e.target.value)} id="productType" name="Type Switcher">
                    <option value="dvd">DVD</option>
                    <option value="book">Book</option>
                    <option value="furniture">Furniture</option>
                </select>
                <br></br>
                <br></br>
                <div id="typeinput">
                    {type === "dvd" &&
                        <div id="DVD">
                            <div id="labels">
                                <label for="size">Size(MB)</label>
                            </div>
                            <div id="inputs">
                                <input onChange={(e) => setMb(e.target.value)} id="weight"></input>
                            </div>
                        </div>
                    }
                    {type === "furniture" &&
                        <div id="Furniture">
                            <div id="labels">
                                <label for="height">Height(CM)</label>
                                <label for="width">Width(CM)</label>
                                <label for="length">Length(CM)</label>
                            </div>
                            <div id="inputs">
                                <input onChange={(e) => setHeight(e.target.value)} id="height"></input>
                                <input onChange={(e) => setWidth(e.target.value)} id="width"></input>
                                <input onChange={(e) => setLength(e.target.value)} id="length"></input>
                            </div>
                        </div>
                    }
                    {type === "book" &&
                        <div id="Book">
                            <div id="labels">
                                <label for="weight">Weight(KG)</label>
                            </div>
                            <div id="inputs">
                                <input onChange={(e) => setWeight(e.target.value)} id="weight"></input>
                            </div>
                        </div>
                    }
                    {pleaseadd === true &&
                        <h1>Please, submit required data</h1>
                    }
                    {pleaseformat === true &&
                        <h1>Please, provide the data of indicated type</h1>
                    }
                    {changesku === true &&
                        <h1>That SKU already exists!</h1>
                    }
                </div>
            </div>
        </div>
    )
}