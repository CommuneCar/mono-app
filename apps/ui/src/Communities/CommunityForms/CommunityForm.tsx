import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { Community } from '@communecar/types';
import { SubmitButton } from '../../Components/styles/SubmitButton.styled';
import { FORMS_TEXT, TEXT } from '../../themes/default/consts';

interface CommunityFormProps {
  communityToUpdate?: Community;
  onCreate: (community: Community) => void;
  onUpdate: (community: Community) => void;
  isOpen: boolean;
  handleClose: () => void;
}

const emptyCommunity: Community = {
  id: '',
  name: '',
  description: '',
  numberOfMembers: 0,
  picturesUrl: [],
};

const CommunityForm: React.FC<CommunityFormProps> = ({
  communityToUpdate,
  onCreate,
  onUpdate,
  isOpen,
  handleClose,
}) => {
  const isUpdateState = !!communityToUpdate;
  const [community, setCommunity] = useState<Community>(
    isUpdateState ? communityToUpdate : emptyCommunity,
  );
  const formText = isUpdateState
    ? FORMS_TEXT.UPDATE_COMMUNITY
    : FORMS_TEXT.CREATE_COMMUNITY;

  useEffect(() => {
    if (isUpdateState) {
      setCommunity(communityToUpdate);
    }
  }, [communityToUpdate, isUpdateState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (communityToUpdate) {
      onUpdate(community);
    } else {
      onCreate(community);
    }
    handleClose();
  };

  return (
    <Dialog
      open={isOpen || !!communityToUpdate}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{formText.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{formText.description}</DialogContentText>
        <TextField
          id="communityName"
          name="name"
          label="Community Name"
          type="communityName"
          variant="standard"
          margin="dense"
          autoFocus
          required
          fullWidth
          value={community.name}
          onChange={handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          type="description"
          variant="standard"
          margin="dense"
          autoFocus
          required
          fullWidth
          value={community.description}
          onChange={handleChange}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{TEXT.CANCEL}</Button>
        <SubmitButton type="submit">{formText.submitText}</SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { CommunityForm };
