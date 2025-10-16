import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import app from '../firebase';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { successfecth } from '../redux/userReducer';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

const EditProfilePopup = ({ setPopx }) => {
  const { currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profilePic, setProfilePic] = useState(undefined);
  const [profilePicPerc, setProfilePicPerc] = useState(0);
  const [input, setInput] = useState({
    username: currentuser.username || '',
    email: currentuser.email || '',
    password: '',
    profilepicture: currentuser.profilepicture || '',
    location: currentuser.location || {
      country: '',
      state: '',
      streetAddress: ''
    }
  });

  const uploadProfilePicture = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfilePicPerc(progress);
      },
      (error) => {
        console.error(error);
        toast.error("Image upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => ({ ...prev, profilepicture: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    if (profilePic) uploadProfilePicture(profilePic);
  }, [profilePic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/update/${currentuser._id}`, input);
      toast.success("Profile updated!");
      setPopx(false);
      dispatch(successfecth(res.data));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div style={{ position: 'fixed', zIndex: '100000000', left: '0', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <ModalContent>
        <span>
          <p
            style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => setPopx(false)}
          >x</p>
          <h2 style={{ color: 'white' }}>Edit Profile</h2>
        </span>
        <form>
          <p>Profile Picture:</p>
          {profilePicPerc > 0 ? (
            <Mypperc>Uploading: {Math.ceil(profilePicPerc)}%</Mypperc>
          ) : (
            <InputContent name="profilepicture" type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
          )}
          {input.profilepicture && (
            <div style={{ marginTop: '10px' }}>
              <img src={input.profilepicture} alt="Preview" style={{ width: '100px', borderRadius: '8px' }} />
            </div>
          )}
          <br /><br />
          <InputContent name='username' type='text' value={input.username} onChange={handleInputChange} placeholder="Username" />
          <br /><br />

          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <div className="d-flex gap-3">
              <Form.Control
                type="text"
                placeholder="Country"
                className="flex-fill"
                value={input.location.country}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value }
                  }))
                }
              />
              <Form.Control
                type="text"
                placeholder="State/Province/Region"
                className="flex-fill"
                value={input.location.state}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value }
                  }))
                }
              />
              <Form.Control
                type="text"
                placeholder="Street Address"
                className="flex-fill"
                value={input.location.streetAddress}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    location: { ...prev.location, streetAddress: e.target.value }
                  }))
                }
              />
            </div>
          </Form.Group>

          <br /><br />
          <InputContent name='email' type='email' value={input.email} onChange={handleInputChange} placeholder="Email" />
          <br /><br />
          <InputContent name='password' type='password' value={input.password} onChange={handleInputChange} placeholder="New Password" />
          <br /><br />

          <button
            type="button"
            onClick={handleSaveChanges}
            style={{ width: '95%', cursor: 'pointer', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none' }}
          >
            Save Changes
          </button>
        </form>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  z-index: 200000000;
  background-color:black;
  margin: -3% auto;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: gray;
  max-height: 90vh;        /* 👈 limit height */
  overflow-y: auto;        /* 👈 make it scrollable */
`;

const InputContent = styled.input`
  background-color: black;
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: white;
`;

const Mypperc = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: white;
`;

export default EditProfilePopup;
