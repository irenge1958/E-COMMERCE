import React, { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {deleteProductin} from '../redux/commentreducer'
import {emptybasket} from '../redux/commentreducer'
import PayPalButton from './buttonpaypal'
import apiclient from './apiclient'
import ReceiptModal from './reciept'
import { useNavigate } from 'react-router-dom';
import AuthModal from './sign';
// import ReceiptModal from './reciept'
const Baskets = () => {
    const navigateto=useNavigate()
    const {currentcomment} = useSelector((state) => state.comment)
    const dispatch=useDispatch()
    const {currentuser} = useSelector((state) => state.user)
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState({});
    const [products, setProducts] = useState(currentcomment);
    const [show, setShow] = useState(false);
    const updateQuantity = (id, delta) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, quantity: Math.max(1, product.quantity + delta) }
                    : product
            )
        );
    };

    const deleteProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        dispatch(deleteProductin(id))
    };
    const signnin = () => {
        if (!currentuser) {
          const confirmLogin = window.confirm('You must log in first. Do you want to log in?');
          if (confirmLogin) {
            setShow(true); // open your login modal
          } else {
            alert('Action cancelled.');
          }
          return;
        }
      };
      
   const handlePaymentSuccess=async(details)=>{
 console.log(details)

 try {
    await Promise.all(
      products.map(async (x) => {
        try {
          await apiclient.post(`/product/makepurchase/${currentuser._id}`, {
            title: x.title,
            price: x.price,
            transactionid: details.id,
            nameuser: currentuser.username,
            pic: x.image // Use x.pic instead of products.pic to avoid issues with accessing product-specific data
          });
          console.log(`Purchase made successfully for product: ${x.pic}`);
        } catch (error) {
          if (error.response) {
            // Server responded with a status other than 2xx
            console.error(`Failed to purchase product: ${x.pic}`);
            console.error("Error response data:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
          } else if (error.request) {
            // Request was made but no response received
            console.error(`No response received for product: ${x.title}`);
            console.error("Request data:", error.request);
          } else {
            // Something else triggered the error
            console.error(`Error making purchase for product: ${x.title}`);
            console.error("Error message:", error.message);
          }
        }
      })
    );
    console.log("All purchases were made successfully");
  } catch (error) {
    console.error("An error occurred while making purchases:", error);
  }
  
  
  setReceiptData({
    transactionId: details.id,
    nameuser:currentuser.username,
    productN:products.length,
    amount: details.purchase_units[0].amount,
    date: new Date().toLocaleString(),
    status: 'Success'
  });
  dispatch(emptybasket())
  setShowReceipt(true);
  
   }
    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '10px auto',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        basketItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        productDetails: {
            display: 'flex',
            alignItems: 'center',
            flex: 1,
        },
        productImage: {
            width: '80px',
            height: 'auto',
            marginRight: '1rem',
            borderRadius: '5px',
        },
        productInfo: {
            flex: 1,
        },
        productTitle: {
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
        },
        productDescription: {
            fontSize: '0.9rem',
            color: '#555',
            marginBottom: '0.5rem',
        },
        productPrice: {
            fontSize: '1rem',
            color: '#333',
            marginBottom: '0.5rem',
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
        },
        button: {
            padding: '0.25rem 0.5rem',
            fontSize: '1rem',
            margin: '0 0.5rem',
            cursor: 'pointer',
        },
        deleteButton: {
            backgroundColor: '#ff4d4d',
            color: '#fff',
            border: 'none',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer',
            borderRadius: '4px',
        },
        total: {
            fontWeight: 'bold',
            fontSize: '1.3rem',
            textAlign: 'right',
            color: '#333',
        },
    };
const handleClose=async()=>{
    setShowReceipt(false)
    navigateto('/productuserList/all')
}
    return (
        <div style={styles.container}>
             <ReceiptModal
        show={showReceipt}
        onHide={handleClose}
        receiptData={receiptData}
      />
            <h1>Your Basket</h1>
            <AuthModal show={show} handleClose={() => setShow(false)} />
            {products.length===0?<div>No product in your basket</div>:products.map((product) => (
                <div key={product.id} style={styles.basketItem}>
                    <div style={styles.productDetails}>
                        <img src={product.image} alt={product.title} style={styles.productImage} />
                        <div style={styles.productInfo}>
                            <h2 style={styles.productTitle}>{product.title}</h2>
                            <p style={styles.productDescription}>{product.description}</p>
                       
                            <button style={styles.deleteButton} onClick={() => deleteProduct(product.id)}>
                        Remove from your basket
                    </button>
              
                            
                        </div>
                        <div style={styles.quantityControls}>
                          
                                <button style={styles.button} onClick={() => updateQuantity(product.id, -1)}>-</button>
                                <span>{product.quantity}</span>
                                <button style={styles.button} onClick={() => updateQuantity(product.id, 1)}>+</button>
                            </div>
                    </div>
                    <p style={styles.productPrice}>Price: ${product.price.toFixed(2)}</p>
                </div>
            ))}
            <hr />
            <h2 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h2>
            {!currentuser ? (
  <button onClick={signnin} className="btn btn-primary">
    Log in to pay
  </button>
) : (
  totalPrice > 0 && (
    <PayPalButton
      amount={totalPrice.toFixed(2)}
      onSuccess={handlePaymentSuccess}
    />
  )
)}

        </div>
    );
};

export default Baskets;