import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import app from '../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const Upload = ({ setpop }) => {
    const [video, setVideo] = useState(null);
    const [images, setImages] = useState(null);
    const [imagesPerc, setImagesPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [input, setInput] = useState({
        MyUrlimg: '',
        title: '',
        description: '',
        tagg: '',
        producturl: '',
        price: '',
        category: '',
        quantity: ''
    });

    const { currentuser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const uploadFile = (file, MyUrl) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                MyUrl === 'MyUrlvideo' ? setVideoPerc(progress) : setImagesPerc(progress);
            },
            (error) => {
                console.error("Upload error:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInput((prev) => ({ ...prev, [MyUrl]: downloadURL }));
                });
            }
        );
    };

    useEffect(() => {
        if (video) uploadFile(video, 'MyUrlvideo');
    }, [video]);

    useEffect(() => {
        if (images) uploadFile(images, 'MyUrlimg');
    }, [images]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/product/createproduct', {
                pic: input.MyUrlimg,
                producturl: input.MyUrlvideo,
                title: input.title,
                category: input.category,
                tagg: input.tagg,
                description: input.description,
                price: input.price,
                quantity: input.quantity
            });

            console.log(response.data);
            
            setpop(false);
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div style={{ position: 'fixed', zIndex: 1000000, color: 'black', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ModalContent>
                <span>
                    <p style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setpop(false)}>x</p>
                </span>
                <form>
                <p>Video:</p>
                    <div>
                        {videoPerc > 0 ? (
                            <Mypperc>Uploading: {Math.ceil(videoPerc)}%</Mypperc>
                        ) : (
                            <InputContent name="producturl" type='file' onChange={(e) => setVideo(e.target.files[0])} required />
                        )}
                    </div>
                    <br />
       
                    <InputContent name='title' type='text' value={input.title} onChange={handleInputChange} placeholder="Title" required /><br/>
                    <InputContent name='quantity' type='text' value={input.quantity} onChange={handleInputChange} placeholder="Quantity" required /><br/>
                    <InputContent name='price' type='text' value={input.price} onChange={handleInputChange} placeholder="Unit Price" required /><br/>
                    <Form.Select
  name="category"
  value={input.category}
  onChange={handleInputChange}
  required
>
  <option value="">Select category</option>
  <option value="gadgets">Gadgets</option>
  <option value="agriculture-tools">Agriculture Tools</option>
  <option value="cars">Cars</option>
  <option value="computers">Computers</option>
  <option value="energy">Energy</option>
</Form.Select>
                    <InputContent name='description' type='text' value={input.description} onChange={handleInputChange} placeholder="Description" required /><br/>
                    <InputContent name='tagg' type='text' value={input.tagg} onChange={handleInputChange} placeholder="Tags (comma-separated)" required />
                    <p>Image:</p>
                    {imagesPerc > 0 ? (
                        <Mypperc>Uploading: {Math.ceil(imagesPerc)}%</Mypperc>
                    ) : (
                        <InputContent type="file" name="producturlx" onChange={(e) => setImages(e.target.files[0])} required />
                    )}
                    <InputContent type='button' onClick={handleAddVideo} value='Upload' style={{ width: '95%', cursor: 'pointer', color: 'black' }} />
                </form>
            </ModalContent>
        </div>
    );
};

const ModalContent = styled.div`
  z-index: 2000000;
  background-color: black;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
`;

const InputContent = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: black;
`;

const Mypperc = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: white;
`;

export default Upload;
