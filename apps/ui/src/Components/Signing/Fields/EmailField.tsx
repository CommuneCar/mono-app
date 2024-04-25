import { AlternateEmail } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';

interface EmailFieldProps {
  emailError: boolean;
  isEmailError: (value: string) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({
  emailError,
  isEmailError,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
      <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        variant="standard"
        onChange={(e) => isEmailError(e.target.value as string)}
        error={emailError}
      />
    </Box>
  );
};

export { EmailField };
