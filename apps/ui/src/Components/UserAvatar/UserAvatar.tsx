import { Avatar, Box, Typography } from '@mui/material';
import { COLORS, SPACING } from '../../themes/default/consts';
import { getUserInitials } from './utils';

interface UserLogoProps {
  name: string;
  pic?: string;
  bgColor: string;
}

const UserLogo = ({ name, pic, bgColor }: UserLogoProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          width: SPACING.SP16,
          height: SPACING.SP16,
          color: COLORS.TEXT_PRIMARY,
          bgcolor: bgColor,
        }}
        src={pic}
      >
        {getUserInitials(name)}
      </Avatar>
      <Typography paddingLeft="4px">{name}</Typography>
    </Box>
  );
};

export default UserLogo;
