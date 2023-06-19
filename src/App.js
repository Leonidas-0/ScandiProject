import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    FetchAPI()
  },
    [data === ""])
  const url = "http://localhost:8000/list.php";
  async function FetchAPI () {
    const res = await axios.get(url);
    setData(res.data)
    return false
  };
  return (
    <div className="App">
      <div id="header">
      <h1>Product List</h1>
      <div id="addremove">
      <button>ADD</button>
      <button className='.delete-checkbox'>MASS DELETE</button>
      </div>
      </div>
      <hr></hr>
{data && (
  <div id="products">
  <div>
    <div>
    {data[0].SKU}
    </div>
    <div>
    {data[0].Name}
    </div>
  </div>
    {/* <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card> */}
  </div>
)}
    </div>
  );
}

export default App;
