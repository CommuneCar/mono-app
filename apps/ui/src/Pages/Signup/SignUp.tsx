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
import { useEffect, useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../utils/signing/validation';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { TEXT } from '../../themes/default/consts';
import { isEmpty } from 'lodash';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gander: 'Other',
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
    const hasErrors = Object.values(formErrors).some(error => error !== null);
    const allFieldsFilled = Object.values(formData).every(field => !isEmpty(field));
    if(!allFieldsFilled) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(!hasErrors);
    }
  }, [formErrors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name , value} = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error: boolean;

    switch (name) {
      case 'firstName':
        error = validateName(value);
        break;
      case 'LastName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'phone':
        error = validatePhoneNumber(value);
        break;
      default:
        break;
    }

    setFormErrors(prev => ({ ...prev, [name]: error ? error : null }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser: SignUpUser = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      phoneNumber: data.get('phone') as string,
      gander: (data.get('gander') as Gander) ?? 'Other',
    };
    if(isSubmitEnabled) {
      navigate('/rides');
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
                    onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value as Gander}))}
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
                          checked={ !!formData['gander'] || formData['gander'] === 'Other'}
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
