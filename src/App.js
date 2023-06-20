import logo from './logo.svg';
import './App.css';
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
import { Routes, Route } from "react-router-dom"
import Home from './Home'; 
import Add from './Add';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-product" element={<Add />} />
        {/* <Route path="/Openmanga/:mangaid" element={<Openmanga />} />
        <Route path="/Genres" element={<Categories />} />
        <Route path="/:mangaid/:chapterid" element={<Chapter />} />
        <Route path="genre/:genreid" element={<Genremanga />} />
        <Route path="/About" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
