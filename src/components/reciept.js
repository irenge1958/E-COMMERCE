import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

const ReceiptModal = ({ show, onHide, receiptData }) => {
  const receiptRef = useRef();

  const handleScreenshot = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const image = canvas.toDataURL('image/png');

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = image;
      link.download = 'receipt.png';
      link.click();
    }
  };
console.log(receiptData)
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={receiptRef}>
        <h5>Thank you for your payment!</h5>
        <p><strong>Transaction ID:</strong> {receiptData.transactionId}</p>
        <p><strong>Buyer:</strong> {receiptData.nameuser}</p>
        <p><strong>Number of product:</strong> {receiptData.productN}</p>
     
        <p><strong>Amount:</strong> ${receiptData.amount?.value}</p>
        <p><strong>Date:</strong> {receiptData.date}</p>
        <p><strong>Status:</strong> {receiptData.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleScreenshot}>
          Download reciept
        </Button>
        <Button variant="primary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
