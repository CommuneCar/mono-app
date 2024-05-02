import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';

const managerOptions: string[] = ['Edit'];
const userOptions: string[] = [];

const ITEM_HEIGHT = 48;

export interface CardMenuProps {
  isManager?: boolean;
}

const CardMenu: React.FC<CardMenuProps> = ({ isManager = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = () => {
    handleClose();
  };

  const options = [...userOptions, ...managerOptions];

  return (
    isManager && (
      <Box>
        <IconButton id="more" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={handleSelectOption}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  );
};

export { CardMenu };
