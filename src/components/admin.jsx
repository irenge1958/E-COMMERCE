import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LineChart from './salegraph';
import SalesDoughnutChart from './salespercontinent';
import { useLocation,Link } from "react-router-dom";
import AdminOrderTable from './order';
import {logout} from '../redux/userReducer'
import {useDispatch } from 'react-redux'
import InventoryTable from './product'
import CustomerTable from './users'
import Enquiry from './enquiry'
import AdminOrderTablex from './neworeders';
const AdminPage = () => {
  const location = useLocation();
 const dispatch=useDispatch()


  return (
    <>
 <div className="d-flex" >
{/* Sidebar */}
<div className="bg-dark text-white p-3" style={location.pathname!=='/'?{height:'100vh',width:'250px'}:{width:'250px'}}>
  <h4 className="mb-4">Admin Panel</h4>
  <ul className="nav flex-column">
    <li className="nav-item mb-3">
      <Link to='/' style={{textDecoration:'none'}} className="nav-link text-white">Dashboard</Link>
    </li>
    <Link to='/Users' style={{textDecoration:'none'}}>
     <li className="nav-item mb-3">
         <p  className="nav-link text-white">Users</p>
     </li>
    </Link>
    <Link to='/inquiry' style={{textDecoration:'none'}}>
     <li className="nav-item mb-3">
         <p  className="nav-link text-white">Enquiry</p>
     </li>
    </Link>
    <li className="nav-item mb-3" onClick={()=>{dispatch(logout())}}>
      <a href="#" className="nav-link text-white">Logout</a>
    </li>
  </ul>
</div>

{/* Main Content */}
{location.pathname==='/' &&
<div className="flex-grow-1 p-4">
  <h1 className="mb-4" style={{color:'white'}}>Dashboard</h1>
  <div className="row">
    <div className="col-md-3">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Sales</h5>
          <div style={{ width: '150px', height: '140px' }}>
<CircularProgressbar
  value='50'
  text='50%'
  styles={buildStyles({
    textColor: '#000',
    pathColor: '#28a745',
    trailColor: '#d6d6d6',
  
  })}
/>

</div>
<br></br>
  <h5 style={{color:'gray'}}>Total : <span style={{color:'#28a745'}}> 8000$</span></h5>
        </div>
      </div>
    </div>
   
    <div className="col-md-9">
      <div className="row"> 
    <div className="col-md-3">
       <Link to='/order' style={{textDecoration:'none'}}>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title" style={{display:'flex',justifyContent:'space-between'}}><span>Orders</span> <ShoppingBasketIcon/> </h5>
          <h6>200</h6>   
          <h8 style={{color:'green'}}>300$</h8> 
        </div>
      </div>
      </Link>
    </div>
   
    
    <div className="col-md-3">
    <Link to='/NewOrders' style={{textDecoration:'none'}}>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title" style={{display:'flex',justifyContent:'space-between'}}>New Orders<ShoppingBasketIcon/></h5>
          <h6>700</h6>    
          <h8 style={{color:'green'}}>300$</h8> 
        </div>
      </div>
      </Link>
    </div>
    <div className="col-md-3">
    <Link to='/Users' style={{textDecoration:'none'}}>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title" style={{display:'flex',justifyContent:'space-between'}}>Users<span><PersonIcon/></span></h5>
          <h6>500</h6>     
          <h8 style={{color:'green'}}>300$</h8> 
        </div>
      </div>
      </Link>
    </div>
    <div className="col-md-3">
    <Link to='/Products' style={{textDecoration:'none'}}>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title" style={{display:'flex',justifyContent:'space-between'}}>Products<InventoryIcon /></h5>
<h6>400</h6>  
<h8 style={{color:'green'}}>300$</h8>                

        </div>
      </div></Link>
    </div> 
   
    </div>
   
    </div>
    <div style={{display:'flex'}}>
     <div  style={{flex:'6'}}>
      <LineChart />
    </div>
    <div  style={{height:'300px',flex:'6',marginTop:'-150px'}}>
      <SalesDoughnutChart />
    </div></div>
  </div>

</div>}
{location.pathname==='/order' && <div><AdminOrderTable/></div>}
{location.pathname==='/Users' && <div><CustomerTable/></div>}
{location.pathname==='/Products' && <div><InventoryTable/></div>}
{location.pathname==='/NewOrders' && <div><AdminOrderTablex/></div>}
{location.pathname==='/inquiry' && <div><Enquiry/></div>}
</div>

</>);
};

export default AdminPage;
