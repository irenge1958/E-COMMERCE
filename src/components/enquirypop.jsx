import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  max-height: 120px;
  resize: vertical;
  
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  margin-top: 15px;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const EnquiryPop = ({ show, onClose }) => {
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/send-enquiry/inquire', {
        userEmail,
        message,
      });

      setStatus({ message: response.data.message, success: true });
      setUserEmail('');
      setMessage('');
    } catch (error) {
      setStatus({ message: 'Failed to send your enquiry. Please try again.', success: false });
    }
  };

  return (
    <Overlay show={show}>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Send Us Your Enquiry</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Message:</Label>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit">Send Enquiry</Button>
        </form>

        {status && <StatusMessage success={status.success}>{status.message}</StatusMessage>}
      </Modal>
    </Overlay>
  );
};

export default EnquiryPop;
