import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
          width: '100%', // Make image width 100% for responsiveness
          marginTop: -10,
        }}
        src={logoWithTitle}
        alt="Login Image"
      />
      <Typography
        component="h2"
        variant="h2"
      >
        {titleText}
      </Typography>
    </Box>
  );
};

export default SigningHeader;
