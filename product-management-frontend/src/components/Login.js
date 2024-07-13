import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to login with:', { email, password });
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token); 
      console.log('Login successful:', response);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Email" fullWidth required margin="normal"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth required margin="normal"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" color="primary">Login</Button>
    </Box>
  );
}

export default Login;