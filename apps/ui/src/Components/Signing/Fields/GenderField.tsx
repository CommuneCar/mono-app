import { Gender } from '@communecar/types';
import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export interface GenderFieldProps {
  formDataGender: Gender;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenderField: React.FC<GenderFieldProps> = ({
  formDataGender,
  handleChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <FormLabel id="demo-controlled-radio-buttons-group" required>
        Gender
      </FormLabel>
      <RadioGroup row name="gender" onChange={handleChange}>
        <FormControlLabel
          value="Female"
          control={<Radio checked={formDataGender === 'Female'} />}
          label="Female"
        />
        <FormControlLabel
          value="Male"
          control={<Radio checked={formDataGender === 'Male'} />}
          label="Male"
        />
        <FormControlLabel
          value="Other"
          control={
            <Radio checked={!formDataGender || formDataGender === 'Other'} />
          }
          label="Other"
        />
      </RadioGroup>
    </Box>
  );
};

export { GenderField };
