import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
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
    function Delete() {
        const array = [];
        for (var i = 0; i < selected.length; i++) {
            array.push({'sku':selected[i]});
        }
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(array)

        })
        navigate(0)
    };

const [data, setData] = useState("");
useEffect(() => {
    FetchAPI()
},
    [data === ""])
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const url = "http://localhost:8000/list.php";
async function FetchAPI() {
    const res = await axios.get(url);
    const sorted = res.data.sort(function (a, b) {
        if (a.baseinfo.toLowerCase() < b.baseinfo.toLowerCase()) { return -1; }
        if (a.baseinfo.toLowerCase() > b.baseinfo.toLowerCase()) { return 1; }
        return 0;
    })
    setData(sorted)
    return false
};
return (
    <div>
        <div id="header">
            <h1>Product List</h1>
            <div id="addremove">
                <Link to={'/add-product'}><Button variant="outlined">ADD</Button></Link>
                <Button onClick={() => Delete()} variant="outlined" id="delete-product-btn">MASS DELETE</Button>
            </div>
        </div>
        <hr></hr>
        {data && (
            <div id="products">
                {data.map(product =>
                    <Card sx={{ width: 300, height: 300, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Checkbox onChange={() => handleselect(product.sku)} {...label} sx={{ position: 'absolute', top: 0, left: 0 }} />
                        <CardContent>
                            <Typography variant="h5">
                                {product.sku.toUpperCase()}
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
                            {product.width &&
                                <Typography variant="h5">
                                    Dimensions: {product.width}X{product.height}X{product.length}
                                </Typography>
                            }
                            {product.weight &&
                                <Typography variant="h5">
                                    Dimensions: {product.weight}KG
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