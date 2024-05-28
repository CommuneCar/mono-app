import {
  Box,
  Link,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  PersonRounded,
  PhoneAndroidRounded,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { ReactElement, useEffect, useState } from 'react';

import { Gender } from '@communecar/types';

import { Page } from '../HomePage/styles';
import { VisuallyHiddenInput } from './styles';
import { useUser } from '../../hooks/Users/useUser';
import { SignUpUser } from '../../types/sign-up-user';
import { validateField } from '../../utils/signing/validation';
import { DEFAULT_HOME_PAGE, TEXT } from '../../themes/default/consts';
import { EmailField } from '../../Components/Signing/Fields/EmailField';
import { PasswordField } from '../../Components/Signing/Fields/PasswordField';
import { SigningHeader } from '../../Components/Signing/SigningHeader';
import { SigininBox } from '../../Components/styles/SigninBox.styled';
import { ProgressMobileStepper } from '../../Components/Signing/SignUpFooter/ProgressMobileStepper';
import { GenderField } from '../../Components/Signing/Fields/GenderField';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, error: serverError } = useUser();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<SignUpUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    age: dayjs(),
    gender: Gender.OTHER,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    age: null,
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  useEffect(() => {
    const hasErrors = Object.values(formErrors).some((error) => error !== null);
    const allFieldsFilled = Object.values(formData).every(
      (field) => !isEmpty(field),
    );
    setHasErrors(hasErrors);
    if (!allFieldsFilled) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(!hasErrors);
    }
  }, [formErrors, formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error ? error : null }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const success = await signUp(formData);
    setIsLoading(false);
    if (success) {
      navigate(DEFAULT_HOME_PAGE);
    }
  };

  const steps: Record<number, { title: string; component: ReactElement }> = {
    0: {
      title: "What's your name?",
      component: (
        <Box sx={{ margin: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              variant="standard"
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName ?? false}
              autoFocus
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              autoComplete="given-name"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              variant="standard"
              onChange={handleChange}
              value={formData.lastName}
              error={formErrors.lastName ?? false}
              autoFocus
            />
          </Box>
        </Box>
      ),
    },
    1: {
      title: "let's keep in touch",
      component: (
        <Box sx={{ margin: 2 }}>
          <EmailField
            emailValue={formData.email}
            emailError={formErrors.email ?? false}
            handleChange={handleChange}
          />
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
              value={formData.phone}
              variant="standard"
              onChange={handleChange}
              error={formErrors.phone ?? false}
            />
          </Box>
        </Box>
      ),
    },
    2: {
      title: "shh.. don't tell anyone",
      component: (
        <Box sx={{ margin: 2 }}>
          <PasswordField
            passwordValue={formData.password}
            passwordError={formErrors.password ?? false}
            handleChange={handleChange}
          />
        </Box>
      ),
    },
    3: {
      title: 'tell us a bit more about yourself',
      component: (
        <Box sx={{ margin: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            {/* <Box
              sx={{
                mt: '1rem',
                // display: 'flex',
                // flexDirection: 'column',
                alignItems: 'baseline',
              }}
            > */}
            <DatePicker
              sx={{ width: '100%', mb: '0.5rem' }}
              disableFuture={true}
              label={"when's your birthday?"}
              value={formData.age}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, age: date ?? dayjs() }))
              }
            />
            <GenderField
              formDataGender={formData.gender}
              handleChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value as Gender,
                }));
              }}
            />
            {/* </Box> */}
          </Box>
        </Box>
      ),
    },
    4: {
      title: 'what do you look like?',
      component: (
        <Box sx={{ margin: 2 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Profile Picture
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      ),
    },
    5: {
      title: "that's it! Enjoy your ride",
      component: (
        <Box sx={{ margin: 2 }}>
          {hasErrors && (
            <Typography color={'error'}>
              You have entered incorrect details, please repeat the process
              again...
            </Typography>
          )}
          <Typography color={'error'}>{serverError}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!isSubmitEnabled && !hasErrors}
            sx={{ mt: 3, mb: 2, width: '100%' }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="info" />
            ) : (
              TEXT.CONTINUE
            )}
          </Button>
        </Box>
      ),
    },
  };

  const maxSteps = Object.keys(steps).length ?? 6;

  return (
    <Page>
      <Container component="main" maxWidth="xs">
        <SigininBox>
          <SigningHeader titleText={'Sign Up'} />
          <Box
            sx={{
              marginTop: 5,
              width: '100%',
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h4" variant="h6">
              {steps[activeStep].title}
            </Typography>
            <Box width={'100%'}>{steps[activeStep].component}</Box>
            <ProgressMobileStepper
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              maxSteps={maxSteps}
            />
          </Box>

          <Grid container justifyContent="center ">
            <Grid item>
              <Link href="/" variant="body2">
                {TEXT.SIGNIN}
              </Link>
            </Grid>
          </Grid>
        </SigininBox>
      </Container>
    </Page>
  );
};

export { SignUp };
