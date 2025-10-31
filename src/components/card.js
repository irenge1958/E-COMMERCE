import React from "react";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import { useNavigate,Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {useSelector,useDispatch} from 'react-redux';
import {addnew} from '../redux/commentreducer'
function Card({ id, image, title, price, rating,description }) {
  const navigateto=useNavigate()
  const dispatch=useDispatch()
  const isMobilex = useMediaQuery({ maxWidth: 500 });
  const {currentcomment} = useSelector((state) => state.comment)
  return (
    <Container>
      <Link to={`/items/${id}`} style={{textDecoration:'none'}}>
      <Image>
        <img src={image} alt="" />
      </Image>
      </Link>
      <Description>
        <h5>{title}</h5>
      <div style={isMobilex?{display:'block'}:{display:'flex',justifyContent:'space-between'}}> <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />  
        <Link to={`/items/${id}`} style={{textDecoration:'none',color:'black'}}>
        <RoundedParagraph >view more</RoundedParagraph>
        </Link>
        </div> 
        <p>$ {price}</p>

        <button onClick={()=>{dispatch(addnew({ id: id, image: image, title: title, price: price, description: description, quantity: 1 }))}}>Add to Cart</button>
      </Description>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 10;
  
  @media only screen and (max-width: 767px) {
   border-radius:10px;
   height: 100%;
     }
`;
const Image = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex: 0.3;
  cursor:pointer;
  img {
    width: 190px;
    height: 160px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: scale(1.05); /* Slightly enlarge on hover */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
    }
  }
`;

const RoundedParagraph = styled.p`
  padding: 5px;
  border: 1px solid black;
  border-radius: 50px;
 
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor:pointer;
  &:hover {
    background-color: lightgray;
    color: black;
  }

`;
const Description = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.7;

  h5 {
    font-size: 16px;
    font-weight: 600;
  }

  p {
    font-weight: 600;
  }

  button {
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;
export default Card;
