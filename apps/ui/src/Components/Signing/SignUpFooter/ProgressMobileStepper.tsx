import * as React from 'react';
import { Box, Link, MobileStepper, Button, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { TEXT } from '../../../themes/default/consts';

export interface ProgressMobileStepperProps {
  maxSteps: number;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

const ProgressMobileStepper: React.FC<ProgressMobileStepperProps> = ({
  maxSteps,
  handleNext,
  handleBack,
  activeStep,
}) => {
  const theme = useTheme();

  const isLastStep = maxSteps === activeStep + 1;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '5rem',
        backgroundColor: 'background.paper',
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Link href="/" variant="body2">
          {TEXT.SIGNIN}
        </Link>
      </Box>
      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="bottom"
        activeStep={activeStep}
        sx={{ width: '100%', flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={isLastStep}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export { ProgressMobileStepper };
