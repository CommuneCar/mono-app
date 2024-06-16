import * as React from 'react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  ITEM_HEIGHT,
  managerOptions,
  userOptions,
} from '../../utils/communities/cardMenuConsts';
import { isEmpty } from 'lodash';
import { MEMBER_OPTIONS } from '../../types/community-actions-enum';

export interface CardMenuProps {
  isManager?: boolean;
  isMember?: boolean;
  optionActions: Record<string, () => void>;
}

const CardMenu: React.FC<CardMenuProps> = ({
  isManager = false,
  isMember = false,
  optionActions,
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
    const action = optionActions[option];
    if (action) {
      action();
    }
    handleClose();
  };

  const currentMangerOptions = isManager ? managerOptions : [];
  const currentMemberOptions = isMember || isManager ? userOptions : [];

  const allOptions = [...currentMemberOptions, ...currentMangerOptions];
  const options = isMobile
    ? allOptions
    : allOptions.filter((option) => option !== MEMBER_OPTIONS.SEE_RIDES);

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
