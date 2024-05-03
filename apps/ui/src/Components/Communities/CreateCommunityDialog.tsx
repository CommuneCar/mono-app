import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

import { Community } from '@communecar/types';

import { TEXT } from '../../themes/default/consts';
import { SubmitButton } from '../styles/SubmitButton.styled';

interface CreateCommunityDialogProps {
  handleClose: () => void;
  isOpen: boolean;
  handleNewCommunity: (newCommunity: Community) => void;
}

const CreateCommunityDialog: React.FC<CreateCommunityDialogProps> = ({
  isOpen,
  handleClose,
  handleNewCommunity,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const communityName = formJson.communityName;
    const description = formJson.description;
    const newCommunity: Community = {
      name: communityName,
      description,
      numberOfMembers: 0,
      picturesUrl: [],
    };
    handleNewCommunity(newCommunity);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{TEXT.CREATE_COMMUNITY}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {TEXT.CREATE_COMMUNITY_DESCRIPTION}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="communityName"
          name="communityName"
          label="Community Name"
          type="communityName"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="description"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{TEXT.CANCEL}</Button>
        <SubmitButton type="submit">{TEXT.CREATE}</SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { CreateCommunityDialog };
