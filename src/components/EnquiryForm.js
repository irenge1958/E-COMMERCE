import React, { useState } from 'react';
import apiclient from './apiclient'
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const EnquiryForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiclient.post('/api/send-enquiry/inquire', {
        userEmail,
        message,
      });

      setStatus({ message: response.data.message, success: true }); // Show success message
    } catch (error) {
      setStatus({ message: 'Failed to send your enquiry. Please try again.', success: false });
    }
  };

  return (
    <FormContainer>
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

      {status && <StatusMessage success={status.success}>message sent successfully</StatusMessage>}
    </FormContainer>
  );
};

export default EnquiryForm;
