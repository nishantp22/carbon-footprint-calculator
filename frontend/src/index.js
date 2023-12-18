import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Navbar></Navbar> 
      <App />
      <Footer></Footer>
    </BrowserRouter>
  </React.StrictMode>
);
