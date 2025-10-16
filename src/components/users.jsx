import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge, Button } from 'react-bootstrap';

const CustomerTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/user/myuserall');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
  const deleteUser = async (userId) => {
    try {
   
      await axios.put(`/user/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Fetch product count for a user
  const fetchProductCount = async (userId) => {
    try {
      const response = await axios.get(`/product/products-count/${userId}`);
      alert(`This user has purchased ${response.data.productCount} products.`);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{color:'white'}}>Customer Table</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Profile Picture</th>
            <th>Location</th>
            <th>From Google</th>
            <th>Account Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.profilepicture ? (
                  <img
                    src={user.profilepicture}
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                ) : (
                  'No Picture'
                )}
              </td>
              <td>{user.location || 'N/A'}</td>
              <td>
                <Badge bg={user.fromgoogle ? 'success' : 'secondary'}>
                  {user.fromgoogle ? 'Yes' : 'No'}
                </Badge>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteUser(user._id)}
                  className="me-2"
                >
                  Delete
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => fetchProductCount(user._id)}
                >
                  Check Products
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerTable;
