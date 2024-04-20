import { LockRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


interface PasswordFieldProps {
    isPasswordError: any;
    passwordError: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({passwordError, isPasswordError}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                          onClick={() => setShowPassword(prev => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>

                      )
                    }}
                  onChange={e => isPasswordError(e.target.value as string)}
                  error={passwordError}
                />
                </Box>
        </div>
    )
}

export { PasswordField }