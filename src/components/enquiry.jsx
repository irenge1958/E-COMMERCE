import React, { useEffect, useState } from 'react';
import apiclient from './apiclient'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge, Button } from 'react-bootstrap';

const Enquiry = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const response = await apiclient.get('api/send-enquiry/myenquire');
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
   
      await apiclient.put(`/api/send-enquiry/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{color:'white'}}>Enquiries</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.message}</td>
           
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
              
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Enquiry;
