import styled from "styled-components";
import Rating from '@mui/material/Rating';
import {useSelector,useDispatch} from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation,useNavigate } from 'react-router-dom';
import PayPalButton from './buttonpaypal'
import { useEffect,useState,useRef } from "react";
import apiclient from './apiclient'
import ReceiptModal from './reciept'
import { format } from 'timeago.js';
import {CircularProgress} from '@mui/material'
const Items = () => {
    const location = useLocation();
    const navigateto=useNavigate()
    const {currentuser} = useSelector((state) => state.user)
    const segments = location.pathname.split('/'); // Split path by '/'
    const productListSegment = segments[2]; 
    const [product,setProduct]=useState({})
    const [showReceipt, setShowReceipt] = useState(false);
const [receiptData, setReceiptData] = useState({});
    const [myprice,setMyprice]=useState(product?.price)    
    const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(''); // State for new comment input
    useEffect(() => {
        const fetchOneProduct = async () => {
          try {
            const res = await apiclient.get(`/product/getoneV/${productListSegment}`);
            setProduct(res.data);
            setMyprice(res.data.price)
            setComments(res.data.comment || []);
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
      
        fetchOneProduct();
      }, [productListSegment]); // Add productListSegment if it can change

  
const [quantity,setQuantity]=useState(1)
const handleprice=(subadd)=>{
if (subadd==='-'){
    if (quantity>1){
        setQuantity(quantity-1)
    setMyprice(product.price*(quantity-1))
    }
    
}
if (subadd==='+'){
        setQuantity(quantity+1)
    setMyprice(product.price*(quantity+1))
}
}
const isMobile = useMediaQuery({ maxWidth: 760 });
    const isMobilex = useMediaQuery({ maxWidth: 600 });
    const handlePaymentSuccess =async(details) => {
     
        try {
            await apiclient.post(`/product/makepurchase/${currentuser?._id}`, {
              title: product.title,
              price: product.price,
              transactionid: details.id,
              nameuser: currentuser.username,
              pic: product.pic
            });
            
            console.log("All purchases were made successfully");
          } catch (error) {
            if (error.response) {
              // Server responded with a status other than 2xx
              console.error("An error occurred while making purchases:", error.response.data);
              console.error("Status code:", error.response.status);
              console.error("Headers:", error.response.headers);
            } else if (error.request) {
              // Request was made but no response received
              console.error("No response received:", error.request);
            } else {
              // Something else triggered the error
              console.error("Error:", error.message);
            }
          }
          
          setReceiptData({
            transactionId: details.id,
            nameuser:currentuser.username,
            productN:quantity,
            amount: details.purchase_units[0].amount,
            date: new Date().toLocaleString(),
            status: 'Success'
          });
         
          setShowReceipt(true);
          
      };
      const handleClose=async()=>{
        setShowReceipt(false)
        navigateto('/productuserList/all')
    }
    const handleAddComment = async () => {
      if (!newComment.trim()) return; // Prevent empty comments
      const commentData = {
        user: currentuser,
        text: newComment,
        date: new Date().toLocaleString(),
      };
  
      try {
        // Assuming the API supports adding comments
        await apiclient.post(`/product/addcommentproduct/${product?.title}`, commentData);
        setComments((prev) => [...prev, commentData]);
        setNewComment(''); // Clear the input field
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };
    return (
        <div style={isMobilex ? { display: 'block', padding: '10px',color:'white' } : { display: 'flex', padding: '10px', gap: '9px', justifyContent: 'space-between',color:'white',backgroundColor:'black' }}>
           
             <ReceiptModal
        show={showReceipt}
        onHide={handleClose}
        receiptData={receiptData}
      />
          <Myimage>
          {product.pic || product.producturl ? <img src={product?.pic} alt="Mini Drone" />:<div
  style={{
    display: 'flex',
    justifyContent: 'center',   // horizontal center
    alignItems: 'center',       // vertical center
    height: '50vh',            // or the height of your container
    width: '100%',
  }}
>
  <CircularProgress
    size="60px"
    style={{ color: '#4db8ff', strokeWidth: '2px' }}
  />
</div>
}
                {product.producturl!==''?<Video style={!isMobile?{width:'180px',height:"190px",marginTop:'-210px'}:{}} >
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={product?.producturl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </Video>:''}
            </Myimage>
            {!isMobilex && <Details>
                <h1>{product?.title}</h1>
                 <p>{product?.description}</p>  
                <hr/>
                <p style={{ fontWeight: '400', color: 'gray', fontSize: '20px' }}>Brand: Fionke</p>
                <div style={{ marginTop: '20px' }}>
  <h3 style={{ fontWeight: 'normal', fontSize: '24px', color: '#333' }}>Comments</h3>
  {comments?.length > 0 ? (
    comments.map((comment, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '15px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* User Profile Picture */}
        <img
          src={comment.user.profilepicture || '/user.png'}
          alt="User Profile"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginRight: '15px',
          }}
        />

        {/* Comment Content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: '#555',
              fontWeight: '500',
              display:'flex',
              gap:'10px'
            }}
          >
            {comment.user.username}
            <p style={{ color: 'gray', fontSize: '12px',marginTop:'2px' }}>{format(comment.createdAt)}</p>
          </p>
          <p
            style={{
              marginTop: '-10px',
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.5',
            }}
          >
            {comment.text}
          </p>
         
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: '#777', fontSize: '16px', marginTop: '10px' }}>
      No comments yet. Be the first to comment!
    </p>
  )}

  {/* Add New Comment */}
 {currentuser && <div style={{ marginTop: '20px' }}>
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows="3"
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      }}
      placeholder="Add your comment..."
    ></textarea>
    <button
      onClick={handleAddComment}
      style={{
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#fa8900',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Add Comment
    </button>
  </div>} 
</div>

            </Details>}
            <Other>
                <h2>$ {myprice}</h2>
                <p>FREE delivery Friday, 25 October. Details Or fastest delivery Tomorrow, 23 October. Order within 13 hrs. Details Delivering to London EC4R – Update location</p>
                <p>In stock</p>
                <Mycounter>
                    <label htmlFor="quantity">Quantity:</label>
                    <div style={{display:'flex',gap:'20px',marginTop:'-14px'}}><h1 onClick={()=>handleprice('+')} style={{fontWeight:'1000'}}>+</h1><h1>{quantity}</h1><h1 style={{fontWeight:'1000'}} onClick={()=>handleprice('-')}>-</h1></div>
                </Mycounter>
            
              {myprice && <PayPalButton amount={myprice} onSuccess={handlePaymentSuccess} />}  
                <Myaddbutton>Add to cart</Myaddbutton>
            </Other>
            {isMobilex && <Details>
              <div style={{ marginTop: '20px' }}>
                <hr></hr>
              <h3 style={{ fontWeight: 'normal', fontSize: '24px', color: 'White' }}>Comments</h3>
  {comments?.length > 0 ? (
    comments.map((comment, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '15px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          maxWidth: '500px'
        }}
      >
        {/* User Profile Picture */}
        <img
          src={comment.user.profilepicture || '/user.png'}
          alt="User Profile"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginRight: '15px',
          }}
        />

        {/* Comment Content */}
        <div style={{ flex: 1 ,color:'white'}}>
          <p
            style={{
              margin: 0,
              fontSize: '16px',
              color: 'white',
              fontWeight: '500',
              display:'flex',
              gap:'10px'
            }}
          >
            {comment.user.username}
            <p style={{   color: 'white', fontSize: '12px',marginTop:'2px' }}>{format(comment.createdAt)}</p>
          </p>
          <p
            style={{
              marginTop: '-10px',
              fontSize: '14px',
              color: 'white',
              lineHeight: '1.5',
            
            }}
          >
            {comment.text}
        
          </p>
         
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: '#777', fontSize: '16px', marginTop: '10px' }}>
      No comments yet. Be the first to comment!
    </p>
  )}

  {/* Add New Comment */}
  {currentuser && <div style={{ marginTop: '20px' }}>
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows="3"
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      }}
      placeholder="Add your comment..."
    ></textarea>
    <button
      onClick={handleAddComment}
      style={{
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#fa8900',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Add Comment
    </button>
  </div>} 
</div>
{isMobilex && <hr></hr>}
                <h1>{product?.title}</h1>
                 <p>{product?.description}</p>  
                <hr/>
                <p style={{ fontWeight: '400', color: 'gray', fontSize: '20px' }}>Brand: Fionke</p>
                <p>$ {product?.price}</p>
                <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly />  
            </Details>}
           
        </div>
    );
}

const Myimage = styled.div`
    width: 100%;
    flex: 5;
    position: relative;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
   
    img {
        width: 100%;
        height: auto;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
`;

const Video = styled.div`
    position: relative;
    margin-left:10px;
    margin-top: -160px;
    margin-bottom:10px;
    width: 130px; /* Adjust as needed */
    height: 135px; /* Adjust as needed */
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`;

const Details = styled.div`
    width: 100%;
    flex: 4;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
`;

const Other = styled.div`
    border: 1px solid gray;
    padding: 10px;
    flex: 3;
    font-size: 20px;
    font-weight: 400;
    border-radius: 20px;
    height: fit-content;
    @media only screen and (max-width: 600px) {
        border:none;
      }
`;

const Mycounter = styled.div`
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    gap: 10px;
`;

const Myaddbutton = styled.button`
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 5px;
`;

const Mybuybutton = styled.button`
    width: 100%;
    height: 33px;
    background-color: #ffd814;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 5px;
`;

export default Items;
