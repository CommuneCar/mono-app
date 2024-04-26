import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default';
import SigningHeader from '../../Components/Signing/SigningHeader';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import {
  validateEmail,
  validatePassword,
} from '../../utils/signing/validation';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { TEXT } from '../../themes/default/consts';
import { isEmpty } from 'lodash';

interface SignInProps {
  setMenuVisible: (value: boolean) => void;
}

const SignIn = ({ setMenuVisible }: SignInProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const hasErrors = Object.values(formErrors).some(error => error !== null);
    const allFieldsFilled = Object.values(formData).every(field => !isEmpty(field));
    if(!allFieldsFilled) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(hasErrors);
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
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
    }

    setFormErrors(prev => ({ ...prev, [name]: error ? error : null }));
  };

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userSignIn = {
      email: data.get('email'),
      password: data.get('password'),
    };
    if(isSubmitEnabled) {
      setMenuVisible(true);
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
            minHeight: '100vh', // Ensure the container takes the full height of the viewport
            justifyContent: 'center', // Center the content vertically
            padding: '0 20px', // Add padding on the sides for mobile devices
          }}
        >
          <SigningHeader titleText="Login"></SigningHeader>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width="100%" // Ensure the form takes full width
          >
            <EmailField
                  emailError={formErrors['email'] ?? false}
                  handleChange={handleChange}
            ></EmailField>
            <PasswordField
                  passwordError={formErrors['password'] ?? false}
                  handleChange={handleChange}
            ></PasswordField>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Link href="#" variant="body2">
                {TEXT.FORGOT_PASSWORD}
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100%' }}
              disabled={isSubmitEnabled}
            >
              Login
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/signup" variant="body2">
                {TEXT.REGISTER}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
