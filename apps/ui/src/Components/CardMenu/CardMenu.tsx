import * as React from 'react';
import { useState } from 'react';

import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MANAGER_OPTIONS } from '../../types/community-actions-enum';
import {
  ITEM_HEIGHT,
  managerOptions,
  userOptions,
} from '../../utils/communities/cardMenuConsts';

export interface CardMenuProps {
  handleEditClick: () => void;
  isManager?: boolean;
}

const CardMenu: React.FC<CardMenuProps> = ({
  isManager = false,
  handleEditClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option: string) => {
    if (option === MANAGER_OPTIONS.EDIT) {
      handleEditClick();
    }
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
          id="card-menu"
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
            <MenuItem key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  );
};

export { CardMenu };
