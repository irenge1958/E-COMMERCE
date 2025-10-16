import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminOrderTable = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [modification, setModification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchPurchasedProduct = async () => {
      const product = await axios.get(`/product/purchasedproduct`);
      const mypurchasedx = product.data.filter((a) => a.state ==='awaiting-shipment');
      setAllproducts(mypurchasedx);
    };
    fetchPurchasedProduct();
  }, [modification]);

  const deleteProduct = async (id) => {
    await axios.put(`/product/deletepurchase/${id}`);
    setModification(!modification);
  };

  const openModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleStatusChange = async () => {
    await axios.put(`/product/updatepurchase/${selectedProductId}`, { status: newStatus });
    setShowModal(false);
    setModification(!modification);
  };

  const getBadgeClass = (state) => {
    switch (state) {
      case 'indelivering':
        return 'badge bg-info';
      case 'alreadypicked':
        return 'badge bg-success';
      case 'intransit':
        return 'badge bg-warning';
      case 'awaiting-list':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{color:'white'}}>New Order Table</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product Name</th>

            <th>Price ($)</th>
            <th>Order Date</th>
            <th>Tracking Order</th>
            <th>Order State</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {allproducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
  
              <td>{product.Price}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
              <td>{product.transactionid}</td>
              <td>
                <span className={getBadgeClass(product.state)}>{product.state}</span>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal(product._id)}
                >
                  Change Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for changing status */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStatusSelect">
              <Form.Label>Select New Status</Form.Label>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Choose status...</option>
                <option value="indelivering">In Delivering</option>
                <option value="alreadypicked">Already Picked</option>
                <option value="intransit">In Transit</option>
                <option value="awaiting-list">Awaiting List</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrderTable;
