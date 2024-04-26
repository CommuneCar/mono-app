import { LockRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

interface PasswordFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  passwordError: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  passwordError,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
      <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
        <LockRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          autoComplete="new-password"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          error={passwordError}
        />
      </Box>
  );
};

export { PasswordField };
