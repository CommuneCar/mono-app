import { Box, Typography } from '@mui/material';
import logoWithTitle from '../../assets/logo-with-title.png';

interface SigningHeaderProps {
  titleText: string;
}

const SigningHeader: React.FC<SigningHeaderProps> = ({ titleText }) => {
  return (
    <Box>
      <Box
        component="img"
        sx={{
          width: '100%',
          top: 0,
          maxWidth: '22rem',
          mt: -2,
        }}
        src={logoWithTitle}
        alt="Login Image"
      />
      <Typography component="h2" variant="h2">
        {titleText}
      </Typography>
    </Box>
  );
};

export { SigningHeader };
