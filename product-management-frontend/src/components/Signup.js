import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.signup(email, password);
      console.log('Signup successful:', response);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        fullWidth
        required
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">Signup</Button>
    </Box>
  );
}

export default Signup;
