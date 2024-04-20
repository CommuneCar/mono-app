import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default';
import SigningHeader from '../../Components/Signing/SigningHeader';
import { AlternateEmail, LockRounded, PersonRounded, PhoneAndroidRounded } from '@mui/icons-material';
import { RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate('/');
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
          <SigningHeader titleText='Sign Up'></SigningHeader>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PersonRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  variant="standard"
                  autoFocus
                />
              </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                />
              </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PhoneAndroidRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone-number"
                  variant="standard"
                />
                </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <LockRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                />
                </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', mt: '1rem' }}>
              <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio/>} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio value={true}/>} label="Other" />
              </RadioGroup>
              </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100%'}}
            >
              Continue
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
