import { Box, Typography } from '@mui/material';
import logoWithTitle from '../../assets/logo-with-title.png';

interface SigningHeaderProps {
  titleText: string;
}

const SigningHeader: React.FC<SigningHeaderProps> = ({ titleText }) => {
  return (
    <Box sx={{ top: 0 }}>
      <Box
        component="img"
        sx={{
          width: '100%', // Make image width 100% for responsiveness
          marginTop: -10,
          maxWidth: '22rem',
          minHeight: '22rem',
          mt: '0.5%',
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

export default SigningHeader;
