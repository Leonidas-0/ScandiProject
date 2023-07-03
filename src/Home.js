import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, json } from 'react-router-dom';
import { Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    function handleselect(sku) {
        if (selected.includes(sku)) {
            let arr = selected.filter((item) => item !== sku);
            setSelected(arr)
        }
        else {
            setSelected([...selected, sku])
        }
    }
    async function Delete() {
        const form = new FormData();
        for (var i = 0; i < selected.length; i++) {
            form.append('sku[]', selected[i]);
        }
        await axios.post(deleteurl, form);
        FetchAPI()
    };

    const [data, setData] = useState("");
    useEffect(() => {
        FetchAPI()
    },
        [data === ""])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const geturl = "https://unstinting-ray.000webhostapp.com/get.php";
    const deleteurl = "https://unstinting-ray.000webhostapp.com/delete.php";

    async function FetchAPI() {
        setData(null)
        const res = await axios.get(geturl);
        if (res.data.length) {
            const sorted = res.data.sort(function (a, b) {
                if (a.sku < b.sku) { return -1; }
                if (a.sku > b.sku) { return 1; }
                return 0;
            })
            setData(sorted)
        }
        else {
            setData(null)
        }
        return false
    };
    return (
        <div>
            <div id="header">
                <h1>Product List</h1>
                <div id="addremove">
                    <Link to={'/add-product'}><Button variant="outlined">ADD</Button></Link>
                    <Button onClick={Delete} variant="outlined" id="delete-product-btn">MASS DELETE</Button>
                </div>
            </div>
            <hr></hr>
            {data && (
                <div id="products">
                    {data.map((product, key) =>
                        <Card key={key} sx={{ width: 300, height: 300, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Checkbox className='delete-checkbox' onChange={() => handleselect(product.sku)} {...label} sx={{ position: 'absolute', top: 0, left: 0 }} />
                            {/* <input type="checkbox" className='delete-checkbox' onClick={() => handleselect(product.sku)} /> */}
                            <CardContent>
                                <Typography variant="h5">
                                    {product.sku}
                                </Typography>
                                <Typography variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="h5">
                                    {product.price}$
                                </Typography>
                                {product.size &&
                                    <Typography variant="h5">
                                        Size: {product.size} MB
                                    </Typography>
                                }
                                {product.dimensions &&
                                    <Typography variant="h5">
                                        Dimensions: {product.dimensions}
                                    </Typography>
                                }
                                {product.weight &&
                                    <Typography variant="h5">
                                        Weight: {product.weight}KG
                                    </Typography>
                                }
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}