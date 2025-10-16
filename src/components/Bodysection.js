import styled from "styled-components";
import Card from "./card"
import ResponsiveNav from "./mysecondnav";
import ProductList from "./productuser"
import { useLocation,useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive';
import axios from 'axios'
import { useEffect,useState } from "react";
import {CircularProgress} from '@mui/material'
const Bodysection=()=>{

  const location = useLocation();

  // Parse query params
  const params = new URLSearchParams(location.search);
  const itemss = params.get("itemss"); // will be "Energy"

  const {currentuser} = useSelector((state) => state.user)
  const isMobilex = useMediaQuery({ maxWidth: 500 });
  const [allproduct,SetAllproduct]=useState([])
  const navigateto=useNavigate()
  useEffect(() => {
    const fetchMyProduct = async () => {
      try {
        const myProducts = await axios.get(`/product/random`);
        if(itemss){
          SetAllproduct(myProducts.data.filter((x)=>x.category===itemss))
        }else{
          SetAllproduct(myProducts.data); // or handle data as needed
        }
       
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchMyProduct();
  }, [itemss]);
  

  return  (

        <div >
          {currentuser && <ResponsiveNav />}
        {!isMobilex && <Banner>
     
    
            </Banner>}    
            <Main >
       {allproduct.length>0 ? allproduct.map((x)=>{
        return   <Card
        id={x._id}
        image={x.pic}
        price={x.price}
        rating={'7'}
        title={x.title}
        description={x.description}
      /> 
       }): <div style={{margin:'auto',
  
       left:0,
       marginTop:'10%'
      
       }}><CircularProgress size="60px" style={{ color: '#4db8ff', strokeWidth: '2px' }} /></div>} 
        
        
      </Main>
        </div>
    )
}
const Banner = styled.div`
  width: 100%;
   height:300px;
  img {
    width: 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.95),
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0)
    );

  

   
  }
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 420px;
  grid-gap: 20px;
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal overflow */

  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 370px;
    grid-gap: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
    background-color: #f5f5f5;
    padding-bottom: 4px;
  }

  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
 
    grid-gap: 15px;
    margin-top: -250px; 
  }

  /* Larger screens */
  @media only screen and (min-width: 1200px) {
    margin-top: -260px;
    padding: 10px 0px;
  }
`;





export default Bodysection;