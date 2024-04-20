import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default';
import logoWithTitle from '../../assets/logo-with-title.png';

interface SignInProps {
  setMenuVisible: (value: boolean) => void;
}

const SignIn = ({ setMenuVisible }: SignInProps) => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh', // Ensure the container takes the full height of the viewport
            justifyContent: 'center', // Center the content vertically
            padding: '0 20px', // Add padding on the sides for mobile devices
          }}
        >
          <Box
            component="img"
            sx={{
              width: '100%', // Make image width 100% for responsiveness
              marginTop: -10,
            }}
            src={logoWithTitle}
            alt="Login Image"
          />
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width="100%" // Ensure the form takes full width
          >
            <TextField
              margin="normal"
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setMenuVisible(true);
                navigate('/rides');
              }}
            >
              Login
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
