import React, { useEffect, useState } from 'react';
import { Table, Button, Image, Container, Modal, Form } from 'react-bootstrap';
import ResponsiveNav from './mysecondnav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiclient from './apiclient'

const ProductList = () => {
  const [myproduct, setMyproduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const { currentuser } = useSelector((state) => state.user);
  const location = useLocation();
  const segments = location.pathname.split('/');
  const productListSegment = segments[2];
  const [modification, setModification] = useState(false);
  useEffect(() => {
    const fecthpurchasedproduct = async () => {
      const mypurchased = await apiclient.get(`/product/getpurchased/${currentuser._id}`);
      if (productListSegment !== 'all') {
        const mypurchasedx = mypurchased.data.filter((a) => a.state === productListSegment);
        setMyproduct(mypurchasedx);
      } else {
        setMyproduct(mypurchased.data);
      }
    };
    fecthpurchasedproduct();
  }, [productListSegment, currentuser._id,modification]);

  const handleMarkAsPicked = async (myproductId,producttitle) => {
    setSelectedProductId(producttitle);

    // Update product status
    await apiclient.put(`/product/updatepurchase/${myproductId}`, { status: 'picked' });
    setModification(!modification)
    // Open modal for comment
    setShowModal(true);
  };

  const handleSubmitComment = async () => {
    if (!selectedProductId) return;

    // Post the user's comment
    await apiclient.post(`/product/addcommentproduct/${selectedProductId}`, {
      text:comment,
      user:currentuser,
    });

    // Reset modal state
    setShowModal(false);
    setComment('');
    setSelectedProductId(null);
  };

  return (
    <>
      <style>
        {`
          .product-list-container {
            max-width: 30%;
          }

          @media (max-width: 576px) {
            .product-list-container {
              max-width: 100%;
              text-align: left;
            }
          }
        `}
      </style>
      <ResponsiveNav />
      <Container style={{color:'white'}} className="my-4 d-flex justify-content-center">
        {myproduct.length > 0 ? (
          <Table
            striped
            bordered
            hover
            responsive
            className="text-start text-center"
            style={{ maxWidth: '600px' }}
          >
            <tbody>
              {myproduct.map((product, index) => (
                <tr key={index}>
                  <td className="d-flex align-items-center">
                    <Image
                      src={product.pic}
                      rounded
                      className="me-3"
                      style={{ width: '70px', height: '70px' }}
                    />
                    <div>{product.title}</div>
                  </td>
                  <td className="align-middle">{product.state}</td>
                  <td className="align-middle">
                   {product.state!=='picked'?<Button
                     variant="primary"
                      size="sm"
                      onClick={() => handleMarkAsPicked(product._id,product.title)}
                    >
                      Mark as Picked
                    </Button>:<Button
                       variant="success"
                      size="sm"
                    >
                      Picked
                    </Button>} 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center my-auto">
            <p className="align-middle">No purchased product</p>
          </div>
        )}
      </Container>

      {/* Modal for user impression */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Give Your Impression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your impression about the product recieved..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitComment}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
