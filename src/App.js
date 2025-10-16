import React from 'react';
import { Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AdminPage from './components/admin'
import { useNavigate } from "react-router-dom";
import Items from './components/Items';
import Baskets from './components/Baskets';
import HomePage from './components/home';
import Navbar from './components/Navbar';
import Bodysection from './components/Bodysection';
import Footer from './components/Footer';
import SearchResults from './components/searchpage'
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import {useSelector } from 'react-redux'
import  ProductList from './components/productuser'
import { useState,useEffect } from 'react';
const Home = () => {
 
  const {currentuser} = useSelector((state) => state.user)
  const [result1,setResult1]=useState([])



  const navigate = useNavigate();
 
  const location = useLocation();
  const segments = location.pathname.split('/'); // Split path by '/'
  const productListSegment = segments[1]; 
  return (
    <div>
      
      {currentuser?._id!=='68e1848f51cef4b18bfdf0df' ?<>  <Navbar setResult1={setResult1} />
      {productListSegment==='productuserList'?<ProductList/>: <Routes>
                <Route path="/">
                  <Route index element={<HomePage />}   />
                  <Route path="items">
                    <Route path=":id" element={<Items />} />
                  </Route> 
                  <Route path="basket"  element={<Baskets />} />
                  <Route path="allproduct"  element={ <Bodysection />} />
                  <Route path="searchs" element={<SearchResults result1={result1}  />}  />
                </Route>
              </Routes>}
   
      <Footer /></>:<AdminPage />}
    
    </div>
  )}
export default Home;
