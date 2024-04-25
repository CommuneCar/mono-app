import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logoWithTitle from '../../assets/logo-with-title.png';

interface SigningHeaderProps {
  titleText: string;
}

const SigningHeader: React.FC<SigningHeaderProps> = ({ titleText }) => {
  return (
    <div>
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
        component="h1"
        variant="h5"
        sx={{
          color: '#263A6D',
          fontSize: '3rem',
          fontWeight: '700',
          fontStyle: 'Heebo',
        }}
      >
        {titleText}
      </Typography>
    </div>
  );
};

export default SigningHeader;
