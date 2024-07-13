import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getAllProducts, deleteProduct } from '../services/api';

const ProductList = ({ socket, onEdit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();

    socket.on('productCreated', (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
    });

    socket.on('productUpdated', (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });

    socket.on('productDeleted', (deletedProductId) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== deletedProductId)
      );
    });

    return () => {
      socket.off('productCreated');
      socket.off('productUpdated');
      socket.off('productDeleted');
    };
  }, [socket]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Warranty (Years)</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>{product.warranty_years}</TableCell>
              <TableCell>{product.available ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(product)}>Edit</Button>
                <Button onClick={() => handleDelete(product._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
