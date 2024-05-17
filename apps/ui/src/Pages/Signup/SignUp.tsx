import {
  Box,
  Link,
  Grid,
  Radio,
  Button,
  Container,
  TextField,
  FormLabel,
  RadioGroup,
  ThemeProvider,
  FormControlLabel,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { PersonRounded, PhoneAndroidRounded } from '@mui/icons-material';

import { Gender } from '@communecar/types';

import defaultTheme from '../../themes/default';
import { useUser } from '../../hooks/Users/useUser';
import { SignUpUser } from '../../types/sign-up-user';
import { validateField } from '../../utils/signing/validation';
import SigningHeader from '../../Components/Signing/SigningHeader';
import { DEFAULT_HOME_PAGE, TEXT } from '../../themes/default/consts';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useUser();

  const [formData, setFormData] = useState<SignUpUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gander: Gender.OTHER,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phone: null,
    gander: null,
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const hasErrors = Object.values(formErrors).some((error) => error !== null);
    const allFieldsFilled = Object.values(formData).every(
      (field) => !isEmpty(field),
    );
    if (!allFieldsFilled) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(!hasErrors);
    }
  }, [formErrors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error ? error : null }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser: SignUpUser = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      phone: data.get('phone') as string,
      gander: (data.get('gander') as Gender) ?? Gender.OTHER,
    };

    signUp(newUser);
    if (isSubmitEnabled) {
      navigate(DEFAULT_HOME_PAGE);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            justifyContent: 'center',
            padding: '0 20px',
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
                    onChange={handleChange}
                    error={formErrors['firstName'] ?? false}
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
                    onChange={handleChange}
                    error={formErrors['lastName'] ?? false}
                    autoFocus
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <EmailField
                  emailError={formErrors['email'] ?? false}
                  handleChange={handleChange}
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
                    onChange={handleChange}
                    error={formErrors['phone'] ?? false}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <PasswordField
                  passwordError={formErrors['password'] ?? false}
                  handleChange={handleChange}
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value as Gender,
                      }))
                    }
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
                          checked={
                            !!formData['gander'] ||
                            formData['gander'] === 'Other'
                          }
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
              disabled={!isSubmitEnabled}
            >
              {TEXT.CONTINUE}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  {TEXT.SIGNIN}
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
