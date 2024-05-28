import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

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
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
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
  );
};

export { ProgressMobileStepper };
