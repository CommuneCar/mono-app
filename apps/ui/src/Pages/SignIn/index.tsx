import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../../themes/default';
import SigningHeader from '../../Components/Signing/SigningHeader';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import { validateEmail, validatePassword } from '../../utils/signing/validation';
import { EmailField } from '../../Components/Signing/Fields/EmailField';

interface SignInProps {
  setMenuVisible: (value: boolean) => void;
}

const SignIn = ({ setMenuVisible }: SignInProps) => {
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const isPasswordError = (value: string) => {setPasswordError(validatePassword(value))}
  const isEmailError = (value: string) => {setEmailError(validateEmail(value))}


  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userSignIn = {
      email: data.get('email'),
      password: data.get('password'),
    }

    console.log({userSignIn});
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
          <SigningHeader titleText='Login'></SigningHeader>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width="100%" // Ensure the form takes full width
          >
            <EmailField emailError={emailError} isEmailError={isEmailError}></EmailField>
            <PasswordField passwordError={passwordError} isPasswordError={isPasswordError}></PasswordField>

            <Box sx={{ display: 'flex', justifyContent: 'end'}}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100%'}}
              onClick={() => {
                setMenuVisible(true);
                navigate('/rides');
              }}
            >
              Login
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Register Now"}
                </Link>
            </Box>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
