import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarContextType {
  showMessage: (
    message: string,
    severity?: 'error' | 'success' | 'info' | 'warning',
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('info');

  const showMessage = useCallback(
    (
      message: string,
      severity: 'error' | 'success' | 'info' | 'warning' = 'info',
    ) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export { useSnackbar, SnackbarProvider };
