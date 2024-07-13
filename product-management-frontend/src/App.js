import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, AppBar, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import Signup from './components/Signup';
import authService from './services/authService';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setEditingProduct(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Product Management
            </Typography>
            {currentUser ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={currentUser ? (
            <>
              <Button variant="contained" color="primary" onClick={handleOpenForm}>
                Add New Product
              </Button>
              <ProductList socket={socket} onEdit={handleEdit} />
              <Dialog open={isFormOpen} onClose={handleCloseForm}>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent>
                  <ProductForm product={editingProduct} onClose={handleCloseForm} />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
