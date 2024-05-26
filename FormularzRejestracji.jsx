import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

const FormularzRejestracji = () => {
  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    email: '',
    haslo: '',
    powtorzHaslo: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    haslo: ''
  });

  const [loginMessage, setLoginMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const isEmailRegistered = (email) => {
    return localStorage.getItem(email) !== null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    for (const key in formData) {
      if (formData[key] === '') {
        window.alert(`Uzupełnij ${key}`);
        valid = false;
      }
    }

    const emailTemplate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTemplate.test(formData.email)) {
      window.alert('Niepoprawny adres email.');
      valid = false;
    }

    const passwordTemplate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordTemplate.test(formData.haslo)) {
      window.alert('Hasło: 5 znaków, duża i mała litera, i cyfra.');
      valid = false;
    }

    if (formData.haslo !== formData.powtorzHaslo) {
      window.alert('Hasła są różne');
      valid = false;
    }

    if (isEmailRegistered(formData.email)) {
      window.alert('Email jest już zarejestrowany.');
      valid = false;
    }

    if (valid) {
      console.log('Ok', formData);

      // Save user data to Local Storage with email as the key
      localStorage.setItem(formData.email, JSON.stringify(formData));
      window.alert('Zarejestrowano.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem(loginData.email));
    if (storedUserData) {
      const { email, haslo } = storedUserData;
      if (email === loginData.email && haslo === loginData.haslo) {
        setLoginMessage('Zalogowano pomyślnie.');
        setLoggedIn(true);
      } else {
        setLoginMessage('Nieprawidłowy email lub hasło.');
      }
    } else {
      setLoginMessage('Brak danych użytkownika w Local Storage. Musisz się najpierw zarejestrować.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Rejestracja / Logowanie
      </Typography>
      {loggedIn && <Navigate to="/todo" replace />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Imię"
              variant="outlined"
              fullWidth
              name="imie"
              value={formData.imie}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Nazwisko"
              variant="outlined"
              fullWidth
              name="nazwisko"
              value={formData.nazwisko}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Hasło"
              variant="outlined"
              fullWidth
              type="password"
              name="haslo"
              value={formData.haslo}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Powtórz hasło"
              variant="outlined"
              fullWidth
              type="password"
              name="powtorzHaslo"
              value={formData.powtorzHaslo}
              onChange={handleChange}
              style={{ marginTop: '10px' }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Zarejestruj się
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              style={{ marginTop: '10px' }}
            />
            <TextField
              label="Hasło"
              variant="outlined"
              fullWidth
              type="password"
              name="haslo"
              value={loginData.haslo}
              onChange={handleLoginChange}
              style={{ marginTop: '10px' }}
            />
            <Button type="submit" variant="contained" color="success" style={{ marginTop: '10px' }}>
              Zaloguj się
            </Button>
          </form>
        </Grid>
      </Grid>
      {loginMessage && <div>{loginMessage}</div>}
    </Container>
  );
};

export default FormularzRejestracji;
