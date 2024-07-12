import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: true,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'available' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Warranty Years"
            name="warranty_years"
            type="number"
            value={formData.warranty_years}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Available"
            name="available"
            value={formData.available}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {product ? 'Update' : 'Create'} Product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;