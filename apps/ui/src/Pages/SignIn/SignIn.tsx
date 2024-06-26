import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material';

import { DEFAULT_HOME_PAGE, TEXT } from '../../themes/default/consts';
import { validateField } from '../../utils/signing/validation';
import { SigningHeader } from '../../Components/Signing/SigningHeader';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import { useUser } from '../../hooks/Users/useUser';
import { Page } from '../HomePage/styles';
import { SigininBox } from '../../Components/styles/SigninBox.styled';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, error: serverError } = useUser();

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

  useEffect(() => {
    setFormErrors({
      email: serverError !== null,
      password: serverError !== null,
    });
  }, [serverError]);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const userSignIn = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    if (isSubmitEnabled) {
      const success = await signIn(userSignIn.email, userSignIn.password);
      setIsLoading(false);
      if (success) navigate(DEFAULT_HOME_PAGE);
    }
  };

  return (
    <Page>
      <Container component="main" maxWidth="xs">
        <SigininBox>
          <SigningHeader titleText="Login"></SigningHeader>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width="100%"
          >
            <EmailField
              emailValue={formData.email}
              emailError={formErrors.email ?? false}
              handleChange={handleChange}
            />
            <PasswordField
              passwordValue={formData.password}
              passwordError={formErrors.password ?? false}
              handleChange={handleChange}
            ></PasswordField>
            <Typography color={'error'}>{serverError}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '100%' }}
              disabled={!isSubmitEnabled}
            >
              {isLoading ? (
                <CircularProgress size={24} color="info" />
              ) : (
                TEXT.LOGIN
              )}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/signup" variant="body2">
                {TEXT.REGISTER}
              </Link>
            </Box>
          </Box>
        </SigininBox>
      </Container>
    </Page>
  );
};

export default SignIn;
