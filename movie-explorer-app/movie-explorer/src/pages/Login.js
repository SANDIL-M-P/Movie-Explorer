import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // To navigate after login

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials for demo
  const validUsername = 'user123';
  const validPassword = 'password123';

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Both fields are required');
      return;
    }

    // Check for correct credentials
    if (username === validUsername && password === validPassword) {
      setError('');
      localStorage.setItem('isLoggedIn', 'true');  // Simulating login persistence
      navigate('/');  // Redirect to home page after successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container sx={{ maxWidth: '400px', paddingTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Display Error Message */}
        {error && <Alert severity="error">{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          
          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '10px', fontWeight: 'bold' }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
