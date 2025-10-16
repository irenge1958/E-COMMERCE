import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Upload from './uploadproduct';

const InventoryTable = () => {
  const [myproduct, setMyproduct] = useState([]);
  const [pop, setpop] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modification, setModification] = useState(false);
  useEffect(() => {
    const getInventory = async () => {
      try {
        const getProduct = await axios.get('/product/getallpro');
        setMyproduct(getProduct.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getInventory();
  }, [pop,modification]);

  const handleAddProduct = () => {
    setpop(true);
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`/product/deleteproduct/${id}`);
      setMyproduct(myproduct.filter(product => product.id !== id));
      setModification(!modification)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleUpdateSave = async () => {
    try {
      await axios.put(`/product/update/${selectedProduct._id}`, selectedProduct);
      setMyproduct(myproduct.map(p => p.id === selectedProduct._id ? selectedProduct : p));
      setShowUpdateModal(false);
      setSelectedProduct(null);
      setModification(!modification)
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {pop && <Upload setpop={setpop} />}
      <div className="container mt-5">
        <h2 className="mb-4" style={{ color: 'white' }}>Inventory Table</h2>
        <div className="d-flex justify-content-between mb-3">
          <Button variant="primary" onClick={handleAddProduct}>Add New Product</Button>
        </div>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Product ID</th>
              <th>Product Picture</th>
              <th>Product Name</th>
              <th>Quantity in Stock</th>
              <th>category</th>
              <th>Price per Unit ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myproduct?.length > 0 ? (
              myproduct.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td><img style={{ width: '50px', height: '50%' }} src={product.pic} alt="Product" /></td>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleUpdate(product)}>Update</Button>
                    <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  0 products in stock
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Update Product Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedProduct.title}
                  onChange={handleInputChange}
                />
                
              </Form.Group>
              <Form.Group className="mb-3">
  <Form.Label>Category</Form.Label>
  <Form.Select
    name="category"
    value={selectedProduct.category}
    onChange={handleInputChange}
  >
    <option value="">Select category</option>
    <option value="gadgets">Gadgets</option>
    <option value="agriculture-tools">Agriculture Tools</option>
    <option value="cars">Cars</option>
    <option value="computers">Computers</option>
    <option value="energy">Energy</option>
  </Form.Select>
</Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={selectedProduct.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InventoryTable;
