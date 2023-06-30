import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { MenuItem, Button } from '@mui/material';
export default function Add() {
    const url = "http://localhost:8000/list.php";
    const navigate = useNavigate();
    function Validate() {
        setPleaseadd(null)
        setPleaseformat(null)
        setChangesku(null)
        setData(null)
        function checkifnum(num) {
            if (num !== "" && /^\d+$/.test(num) === false) {
                return true
            }
            else {
                return false
            }
        }
        if (data.length === 0) {
            setChangesku(false)
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].sku === sku) {
                    setChangesku(true)
                    break;
                }
                else if (i + 1 === data.length) {
                    setChangesku(false);
                }
            }
        }
        if ((sku === "" || name === "" || price === "") || (type === "dvd" && mb === "") || (type === 'book' && weight === "") || ((type === 'furniture') && (height === '' || width === "" || length === ""))) {
            setPleaseadd(true)
        }
        else {
            setPleaseadd(false)
        }
        if (Boolean(sku.match(/^[A-Za-z0-9]*$/)) === false || checkifnum(price) || checkifnum(height) || checkifnum(width) || checkifnum(length) || checkifnum(weight) || checkifnum(mb)) {
            setPleaseformat(true)
        }
        else {
            setPleaseformat(false)
        }
        return false;
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
    async function FetchAPI() {
        const res = await axios.get(url);
        setData(res.data)
        return false
    };
    useEffect(() => {
        FetchAPI()
    },
        [data === null])
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
    useEffect(() => {
        if (pleaseadd === false && pleaseformat === false && changesku === false) {
            const form = new FormData();
            form.append('type', type);
            form.append('sku', sku);
            form.append('name', name);
            form.append('price', price);
            form.append('size', mb);
            form.append('height', height);
            form.append('width', width);
            form.append('length', length);
            form.append('weight', weight);
            axios.post(url, form)
            navigate(`/`)
        }
    }, [pleaseadd, pleaseformat, changesku])
    return (
        <div>
            <div id="header">
                <h1>Product Add</h1>
                <div id="addremove">
                    {/* <Link to={'/add-product'}>ADD</Link> */}
                    <Button onClick={Validate} variant="outlined">Save</Button>
                </div>
            </div>
            <hr></hr>
            <div id="product_form">
                <div id="baseinput">
                    <div id="inputs">
                        <div className="input">
                            SKU
                            <TextField onChange={(e) => setSku(e.target.value)} maxLength="10" id="sku" label="SKU" variant="outlined" />
                        </div>
                        <div className="input">
                            Name
                            <TextField onChange={(e) => setName(e.target.value)} maxLength="20" id="name" label="Name" variant="outlined" />
                        </div>
                        <div className="input">
                            Price($)
                            <TextField onChange={(e) => setPrice(e.target.value)} maxLength="10" id="price" label="Price" variant="outlined" />
                        </div>
                    </div>
                </div>
                <br></br>
                <TextField onChange={(e) => setType(e.target.value)}
                    id="standard-select-currency"
                    select
                    label="Type"
                    defaultValue={"dvd"}
                    helperText="Please select the type of your product"
                    variant="standard"
                >
                    <MenuItem value={'dvd'}>
                        DVD
                    </MenuItem>
                    <MenuItem value={'book'}>
                        Book
                    </MenuItem>
                    <MenuItem value={'furniture'}>
                        Furniture
                    </MenuItem>
                </TextField>
                <br></br>
                <br></br>
                <div id="typeinput">
                    {type === "dvd" &&
                        <div id="DVD">
                            <div className="input">
                                Size(MB)
                                <TextField onChange={(e) => setMb(e.target.value)} id="size" label="Size" variant="outlined" />
                            </div>
                        </div>
                    }
                    {type === "furniture" &&
                        <div id="Furniture">
                            <div id="inputs">
                                <div className="input">
                                    Height
                                    <TextField onChange={(e) => setHeight(e.target.value)} maxLength="10" id="sku" label="SKU" variant="outlined" />
                                </div>
                                <div className="input">
                                    Width
                                    <TextField onChange={(e) => setWidth(e.target.value)} maxLength="20" id="name" label="Name" variant="outlined" />
                                </div>
                                <div className="input">
                                    Length
                                    <TextField onChange={(e) => setLength(e.target.value)} maxLength="10" id="price" label="Price" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    }
                    {type === "book" &&
                        <div id="Book">
                            <div className="input">
                                Weight(KG)
                                <TextField onChange={(e) => setWeight(e.target.value)} id="weight" label="Weight" variant="outlined" />
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