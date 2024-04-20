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
import { AlternateEmail, LockRounded, PersonRounded, PhoneAndroidRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { RadioGroup, FormControlLabel, Radio, FormLabel, IconButton, InputAdornment } from '@mui/material';
import { Gander, SignUpUser } from '../../types/sign-up-user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateEmail, validateFullName, validatePassword, validatePhoneNumber } from '../../utils/signing/validation';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false); 

  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [isSubmitClicked, setSubmitClicked] = useState<boolean>(false);
  const [user, setUser] = useState<SignUpUser>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitClicked(true);
    const data = new FormData(event.currentTarget);
    const newUser: SignUpUser = {
      fullName: data.get('fullName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      phoneNumber: data.get('phone') as string,
      gander: data.get('gander') as Gander ?? 'Other'
    }
    setUser(newUser);
    validateUser(newUser);
  };

  const validateUser = useCallback((user: SignUpUser) => { 
    isFullNameError(user.fullName);
    isEmailError(user.email);
    isPhoneNumberError(user.phoneNumber);
    isPasswordError(user.password);
  }, []);

  const isFullNameError = (value: string) => {setFullNameError(validateFullName(value));}
  const isEmailError = (value: string) => {setEmailError(validateEmail(value))}
  const isPhoneNumberError = (value: string) => {setPhoneNumberError(validatePhoneNumber(value));}
  const isPasswordError = (value: string) => {setPasswordError(validatePassword(value))}

  const isValidUser = useMemo(() => !fullNameError && !passwordError && !phoneNumberError && !emailError, [fullNameError , passwordError , phoneNumberError , emailError])

  useEffect(() => {
    if (isValidUser && isSubmitClicked) {
      navigate('/rides');
      console.log({user});
      
    } else {
      setSubmitClicked(false);
      console.log("Validation failed or user data incomplete.");
    }    
  }, [isValidUser, isSubmitClicked]);


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
                  onChange={e => isFullNameError(e.target.value as string)}
                  error={fullNameError}
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
                  onChange={e => isEmailError(e.target.value as string)}
                  error={emailError}
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
                  onChange={e => isPhoneNumberError(e.target.value as string)}
                  error={phoneNumberError}
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
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(prev => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>

                      )
                    }}
                  onChange={e => isPasswordError(e.target.value as string)}
                  error={passwordError}
                />
                </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', mt: '1rem' }}>
              <FormLabel id="demo-controlled-radio-buttons-group" required>Gender</FormLabel>
              <RadioGroup
                row
                name="gander"
              >
                <FormControlLabel value="Female" control={<Radio/>} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Other" control={<Radio value={true}/>} label="Other" />
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
