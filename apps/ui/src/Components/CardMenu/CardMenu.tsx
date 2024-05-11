import * as React from 'react';
import { useState } from 'react';

import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  MANAGER_OPTIONS,
  MEMBER_OPTIONS,
} from '../../types/community-actions-enum';
import {
  ITEM_HEIGHT,
  managerOptions,
  userOptions,
} from '../../utils/communities/cardMenuConsts';
import { isEmpty } from 'lodash';

export interface CardMenuProps {
  handleEditClick: () => void;
  isManager?: boolean;
  isMember?: boolean;
  handleJumpToRides: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({
  isManager = false,
  isMember = false,
  handleEditClick,
  handleJumpToRides,
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
    } else if (option === MEMBER_OPTIONS.SEE_RIDES) {
      handleJumpToRides();
    }
    handleClose();
  };

  const currentMangerOptions = isManager ? managerOptions : [];
  const currentMemberOptions = isMember || isManager ? userOptions : [];

  const options = [...currentMemberOptions, ...currentMangerOptions];

  return (
    !isEmpty(options) && (
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
