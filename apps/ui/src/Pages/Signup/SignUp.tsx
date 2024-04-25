import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default';
import SigningHeader from '../../Components/Signing/SigningHeader';
import { PersonRounded, PhoneAndroidRounded } from '@mui/icons-material';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Container,
} from '@mui/material';
import { Gander, SignUpUser } from '../../types/sign-up-user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../utils/signing/validation';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { isUndefined } from 'lodash';

const SignUp = () => {
  const navigate = useNavigate();

  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [gander, setGander] = useState<Gander>();

  const [isSubmitClicked, setSubmitClicked] = useState<boolean>(false);
  // const [user, setUser] = useState<SignUpUser>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitClicked(true);
    const data = new FormData(event.currentTarget);
    const newUser: SignUpUser = {
      firstName: data.get('firstName') as string,
      LastName: data.get('LastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      phoneNumber: data.get('phone') as string,
      gander: (data.get('gander') as Gander) ?? 'Other',
    };
    // setUser(newUser);
    validateUser(newUser);
    console.log({ newUser });
  };

  const validateUser = useCallback((user: SignUpUser) => {
    isFirstNameError(user.firstName);
    isLastNameError(user.LastName);
    isEmailError(user.email);
    isPhoneNumberError(user.phoneNumber);
    isPasswordError(user.password);
  }, []);

  const isFirstNameError = (value: string) => {
    setFirstNameError(validateName(value));
  };
  const isLastNameError = (value: string) => {
    setLastNameError(validateName(value));
  };
  const isEmailError = (value: string) => {
    setEmailError(validateEmail(value));
  };
  const isPhoneNumberError = (value: string) => {
    setPhoneNumberError(validatePhoneNumber(value));
  };
  const isPasswordError = (value: string) => {
    setPasswordError(validatePassword(value));
  };

  const isValidUser = useMemo(
    () => !firstNameError && !lastNameError && !passwordError && !phoneNumberError && !emailError,
    [firstNameError,lastNameError, passwordError, phoneNumberError, emailError],
  );

  useEffect(() => {
    if (isValidUser && isSubmitClicked) {
      navigate('/rides');
    } else {
      setSubmitClicked(false);
      console.log('Validation failed or user data incomplete.');
    }
  }, [isValidUser, isSubmitClicked, navigate]);

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
          <SigningHeader titleText="Sign Up"></SigningHeader>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PersonRounded
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant="standard"
                    onChange={(e) => isFirstNameError(e.target.value as string)}
                    error={firstNameError}
                    autoFocus
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PersonRounded
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                  <TextField
                    autoComplete="given-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    variant="standard"
                    onChange={(e) => isLastNameError(e.target.value as string)}
                    error={lastNameError}
                    autoFocus
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <EmailField
                  emailError={emailError}
                  isEmailError={isEmailError}
                ></EmailField>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PhoneAndroidRounded
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone-number"
                    variant="standard"
                    onChange={(e) =>
                      isPhoneNumberError(e.target.value as string)
                    }
                    error={phoneNumberError}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  passwordError={passwordError}
                  isPasswordError={isPasswordError}
                ></PasswordField>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    mt: '1rem',
                  }}
                >
                  <FormLabel id="demo-controlled-radio-buttons-group" required>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    name="gander"
                    onChange={(e) => setGander(e.target.value as Gander)}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Other"
                      control={
                        <Radio
                          checked={isUndefined(gander) || gander === 'Other'}
                        />
                      }
                      label="Other"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100%' }}
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
