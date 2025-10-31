import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import apiclient from './apiclient'
import { useNavigate } from "react-router-dom";
import { successfecth, startfecth,failurefecth } from '../redux/userReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import {CircularProgress} from '@mui/material'
const AuthModal = ({ show, handleClose }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [erreur,setErreur]=useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationx, setLocationx] = useState({ country: "", state: "", street: "" });
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const country = useRef();
  const state = useRef();
  const streetAddress = useRef();
  const confirmPassword = useRef();
  const { loading } = useSelector((state) => state.user);
  console.log(loading)
 
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handlesignin = async (e) => {
    e.preventDefault();
    dispatch(startfecth());
    try {
      const response = await apiclient.post('/auth/signin', {
        email: email.current.value,
        password: password.current.value
      });
      dispatch(successfecth(response.data.user));
     
      handleClose();
    } catch (error) {
      setErreur(error.response.data.message)
      dispatch(failurefecth());
      console.log('Error signing in:', error);
    }
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    dispatch(startfecth());
    const passwordValue = password.current.value.trim();
    const confirmPasswordValue = confirmPassword.current.value.trim();

    if (passwordValue !== confirmPasswordValue) {
      dispatch(failurefecth());
      alert("Passwords do not match. Please try again.");
      return;
    }

    const countryValue = country.current.value.trim();
    const stateValue = state.current.value.trim();
    const streetValue = streetAddress.current.value.trim();
    const filledFields = [passwordValue, email.current.value.trim(), name.current.value.trim(), countryValue, stateValue, streetValue].filter((value) => value !== "");

    if (filledFields.length < 6) {
      dispatch(failurefecth());
      alert("Please fill all fields.");
      return;
    }

    try {
      const createuser = await apiclient.post('/auth/signup', {
        password: passwordValue,
        email: email.current.value,
        name: name.current.value,
        location: {
          country: countryValue,
          state: stateValue,
          street: streetValue,
        },
      });
      dispatch(successfecth(createuser.data.user));

      handleClose();
    } catch (error) {
      dispatch(failurefecth());
      setErreur(error.response.data.message)
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    dispatch(startfecth());
    setIsModalOpen(true);
  };

  const handleLocationSubmit = async () => {
    setIsModalOpen(false);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          const response = await apiclient.post('/auth/signinwithgoogle', {
            email: result.user.email,
            img: result.user.photoURL,
            username: result.user.displayName,
            location: locationx
          });
          dispatch(successfecth(response.data.user));
    
          handleClose();
        } catch (err) {
          dispatch(failurefecth());
          setErreur(err)
          console.error(err);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Sign In' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            {isLogin && (
              <div className="d-flex justify-content-center mb-3">
                {!isModalOpen && (
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center justify-content-center w-100"
                    style={{ maxWidth: '320px', padding: '10px' }}
                    onClick={handleGoogleSignIn}
                  >
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google logo"
                      style={{ width: '20px', marginRight: '10px' }}
                    />
                    Continue with Google
                  </Button>
                )}
              </div>
            )}
            {isModalOpen && (
              <>
                <h2>Enter Your Location</h2>
                <br />
                <Form.Group controlId="formLocation" className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Control
                      type="text"
                      value={locationx.country}
                      onChange={(e) =>
                        setLocationx((prev) => ({ ...prev, country: e.target.value }))
                      }
                      placeholder="Country"
                      className="flex-fill"
                      required
                    />
                    <Form.Control
                      type="text"
                      value={locationx.state}
                      onChange={(e) =>
                        setLocationx((prev) => ({ ...prev, state: e.target.value }))
                      }
                      placeholder="State/Province/Region"
                      className="flex-fill"
                      required
                    />
                    <Form.Control
                      type="text"
                      value={locationx.street}
                      onChange={(e) =>
                        setLocationx((prev) => ({ ...prev, street: e.target.value }))
                      }
                      placeholder="Street Address"
                      className="flex-fill"
                      required
                    />
                  </div>
                </Form.Group>

                <button
                  variant="primary"
                  type="submit"
                  className="mt-3 w-100"
                  onClick={handleLocationSubmit}
                >
                  Submit
                </button>
                <button
                  style={{ backgroundColor: 'blueviolet' }}
                  type="button"
                  className="mt-3 w-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </>
            )}
            {!isModalOpen && (
              <>
                {!isLogin && (
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      ref={name}
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={email}
                    placeholder="Enter email"
                  />
                </Form.Group>

                {!isLogin && (
                  <Form.Group controlId="formAddress" className="mt-3">
                    <Form.Label>Address</Form.Label>
                    <div className="d-flex gap-3">
                      <Form.Control
                        type="text"
                        placeholder="Country"
                        className="flex-fill"
                        ref={country}
                      />
                      <Form.Control
                        type="text"
                        placeholder="State/Province/Region"
                        className="flex-fill"
                        ref={state}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Street Address"
                        className="flex-fill"
                        ref={streetAddress}
                      />
                    </div>
                  </Form.Group>
                )}

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={password}
                    placeholder="Password"
                  />
                </Form.Group>

                {!isLogin && (
                  <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={confirmPassword}
                      placeholder="Confirm password"
                      required
                    />
                  </Form.Group>
                )}

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  {isLogin ? (
                    <span onClick={handlesignin}>{loading?<CircularProgress size="20px" style={{color:'white'}}/>:'sign in'}</span>
                  ) : (
                    <span onClick={handlesignup}>{loading?<CircularProgress size="20px" style={{color:'white'}}/>:'sign Up'}</span>
                  )}
                </Button>
                <p className='error' style={{color:'red'}}>{erreur?erreur:''}</p>
                <div className="mt-3 text-center">
                  <small>
                    {isLogin
                      ? "Don't have an account?"
                      : 'Already have an account?'}{' '}
                    <span
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleAuthMode}
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </span>
                  </small>
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;
