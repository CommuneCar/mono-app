import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Link, Container } from '@mui/material';

import defaultTheme from '../../../../themes/default';
import { TEXT } from '../../../../themes/default/consts';
import { validateField } from '../../../../utils/signing/validation';
import SigningHeader from '../../../../Components/Signing/SigningHeader';
import { EmailField } from '../../../../Components/Signing/Fields/EmailField';
import { PasswordField } from '../../../../Components/Signing/Fields/PasswordField';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error ? error : null }));

    const hasErrors = Object.values(formErrors).some((error) => error !== null);
    const allFieldsFilled = Object.values(formData).every(
      (field) => !isEmpty(field),
    );

    if (!allFieldsFilled) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(!hasErrors);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userSignIn = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (isSubmitEnabled) {
      console.log(userSignIn); // will be sent to server instead
      navigate('/home');
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
              disabled={!isSubmitEnabled}
            >
              {TEXT.LOGIN}
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
