import React, { useState } from 'react';
import AuthModal from './sign';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import SearchIconx from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMediaQuery } from 'react-responsive';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from '../redux/userReducer'
import axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';
import EditProfilePopup from './modifuser'
const Navbar = ({setResult1}) => {
  const { currentuser } = useSelector((state) => state.user);
  const [results,setResult]=useState([])
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [popx, setPopx] = useState(false);
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMobilex = useMediaQuery({ maxWidth: 500 });
  const {currentcomment} = useSelector((state) => state.comment)
  const [paramx,setparamx]=useState(false)
  const [keyword, setKeyword] = useState('');
  const handleClickOutsidex = (event) => {
   
    if (paramx && event.target.id!=='modalx') {
        setparamx(false);
    }
   
};
window.addEventListener('click', handleClickOutsidex);
  const handlesearch=async(q)=>{
    if (q.trim() === '') {
      setResult([]);
      return;
    }
    setKeyword(q)
const res=await axios.get(`/product/search/${q}`)
setResult(res.data)
  }
  const handleSearch = async () => {
    setResult([]);
    try {
        const response = await axios.get(`/product/searchs?keyword=${keyword}`);
        setResult1(response.data);
        navigate('/searchs')
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};
  return (
    <>
      <Mynav>
        <Inner>
          <Logo >
          <img
  src='/logo_transparent2.png'
  alt=''
  onClick={() => navigate('/')}
/>
            <NavButton style={{ marginTop: '4px' }}>
              {!isMobile && <p>Address of delivery</p>}
              <span style={{ display: 'flex',marginTop:'10px'}}>
                <p style={{display:'flex'}}>
                {!isMobile &&  <LocationOnIcon />}
                  {!isMobile ? currentuser?.location ? currentuser?.location.country : <span onClick={() => setShow(true)}>Add{!isMobile && ' your'} location</span>:''}
                  {/* {!isMobile && <p onClick={() => navigate('/allproduct')} style={{display:'flex',marginLeft:'70px',marginTop:'-10px'}}><HomeRoundedIcon  /><p>Home</p> </p>} */}
                </p>
          
              </span>
            </NavButton>
          </Logo>

          <SearchBasketWrapper>
            <SearchBar>
              <input type='text' onChange={(e)=>{handlesearch(e.target.value)}}  placeholder='Search...' />
              <SearchIcon onClick={handleSearch}>
                <SearchIconx style={{ cursor: 'pointer' }} />
              </SearchIcon>
              {/* Render search results */}
             
            </SearchBar>
 <ResultsContainer>
{results.length > 0 && results.map((product) => (
                <ProductItem
                  key={product.id}
                  onClick={() => {
                    setResult([]);
                    navigate(`/items/${product._id}`);
                  }}
                >
                  <img src={product?.pic || '/default-product.png'} alt={product.name} />
                  <div>
                    <h4>{product.title}</h4>
                  </div>
                </ProductItem>
              ))
          }</ResultsContainer>

            {isMobilex && (
              <Link to={`/basket`} style={{textDecoration:'none',color:'black'}}>
              <BasketButton style={{color:'gray'}} onClick={() => navigate('/checkout')}>
                <ShoppingCartIcon style={{ fontSize: '40px', marginTop: '-10px',marginLeft:'-40px' }} />
                <p>{currentcomment?.length===0?'0':currentcomment?.length}</p>
              </BasketButton></Link>
            )}
          </SearchBasketWrapper>

          <RightContainer>
            {!isMobile && (
              <NavButton>
                <p>{currentuser?.username && 'Good morning'}</p>
                <p>{currentuser?.username}</p>
              </NavButton>
            )}

            <NavButton>
              {currentuser ? (
                <img onClick={()=>setparamx(true)} id="modalx"  src={currentuser?.profilepicture || '/user.png'}  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
              ) : (
                <p  onClick={() => setShow(true)} style={{fontStyle:'29px'}}>Login && register <LoginIcon/></p>
              )}
              <AuthModal show={show} handleClose={() => setShow(false)} />
            </NavButton>

            {!isMobilex && (
              <Link to={`/basket`} style={{textDecoration:'none',color:'black'}}>
              <BasketButton style={!isMobilex?{marginTop:'8px',color:'gray'}:{marginTop:'19px',color:'gray'}} >
                <ShoppingCartIcon style={{ fontSize: '65px' }} />
                <p>{currentcomment?.length===0?'0':currentcomment?.length}</p>
              </BasketButton></Link>
            )}
      
      {paramx && ( <div style={{
          backgroundColor: 'white',
          zIndex: '100000',
          marginLeft: '-10px',
          marginTop: '120px',
          padding: '10px',
          borderRadius: '10px',
          position: 'absolute'
        }}>
          <p style={{ cursor: 'pointer', display: 'flex' ,marginBottom:'-10px',marginTop:'-10px'}} onClick={()=>setPopx(true)}>
          <EditIcon />
            <span style={{ fontSize: '20px' ,marginTop:'-5px' }} >Edit info</span>
          </p>
        <hr></hr>
          <p style={{ cursor: 'pointer', display: 'flex' ,marginBottom:'-10px',marginTop:'-12px'}}>
          <LogoutIcon />
            <span style={{ fontSize: '20px' ,marginTop:'-5px'}} onClick={() => dispatch(logout())}>Log out</span>
          </p>
        </div>
      )}
          </RightContainer>
        </Inner>
      </Mynav>
      {popx && <EditProfilePopup setPopx={setPopx} />}
    </>
  );
};

// Styled components
const ResultsContainer = styled.div`
position: absolute;
background-color: white;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
width: 650px; /* Ensures the dropdown matches the width of the wrapper */
max-height: 300px;
overflow-y: auto;
z-index: 10000;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
margin-top: 49px;
border-radius: 5px;
@media only screen and (min-width: 500px) and (max-width: 2060px) {

    width: 45%;

}
@media only screen and (max-width: 500px) {
 margin-left:-30px;
  width:200px;
  margin-top:60px
}
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f9f9f9;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
  }

  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }
`;
const Mynav = styled.div`
  width: 100%;
  height: 90px;
  background-color: #131921;
  display: flex;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 767px) {
    height: 90px;
    flex-direction: column;
  }
  @media only screen and (max-width: 500px) {
    height: 95px;
    flex-direction: column;
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    gap: -4px;
  }
`;

const Logo = styled.div`
  flex: 3;
  margin-left: 20px;
  cursor: pointer;
  display: flex;

  img {
    width: 60px;
    margin-top: 2px;
    @media (max-width: 920px) {
      height: 60px;
    }
  }
  p {
 
    @media (max-width: 500px) {
      margin-left:-10px
    }
  }

  @media only screen and (max-width: 767px) {
    margin-left: 2px;
  }
  @media only screen and (max-width: 500px) {
  
    
    margin-top:-25px;
   
  }
`;

/* New Wrapper for SearchBar and BasketButton */
const SearchBasketWrapper = styled.div`
  display: flex;

  flex: 6;
  margin: 0px 10px;

  /* Stacks Search and Basket on small screens */
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    
    align-items: center;
    
  }
`;

const SearchBar = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 650px;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 5px;
    }
    @media only screen and (max-width: 1260px) {
     
      width:100%;
     
    }
  }
    @media only screen and (max-width: 500px) {
     
      width:200px;
      align-items: center;
      margin-top:10px;
      margin-left:-30px
    }
  }
`;

const SearchIcon = styled.div`
  background-color: #ffbf00;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 5px 0px;

  img {
    width: 22px;
  }
  @media only screen and (max-width: 500px) {
  
   
  
  }
}
`;

const RightContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 15px;
  @media only screen and (max-width: 500px) {
    margin-top:-25px;
    margin-left:-30px
  }
`;

const NavButton = styled.div`
  color: #fff;

  display: flex;
  flex-direction: column;
  cursor: pointer;

  p {
    &:nth-child(1) {
      font-size: 14px;
      margin-bottom: -2px;
    }

    &:nth-child(2) {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  p {
    color: #ffbf00;
    font-weight: 400;
    position: absolute;
    margin-left: 26px;
    margin-top: -6px;
  }
  @media only screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    margin-top: 20px; /* Adds space between the button and the top */
  
   
  
    p {
      position: absolute;
    
      color: #ffbf00;
      font-weight: 600;
      font-size: 14px; /* Adjust size if needed */
      margin-left: -39px;
      margin-top: -8px;
    }
  }
  
`;

export default Navbar;
