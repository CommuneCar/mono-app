import React, { useState } from 'react';
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
import { TEXT } from '../../themes/default/consts';

interface CommunityFormProps {
  isOpen: boolean;
  handleClose: () => void;
  communityToUpdate?: Community;
  formTexts: any;
  onSubmit: (community: Community) => void;
}

const emptyCommunity: Community = {
  id: '',
  name: '',
  description: '',
  numberOfMembers: 0,
  picturesUrl: [],
};

const CommunityForm: React.FC<CommunityFormProps> = ({
  formTexts,
  isOpen,
  onSubmit,
  communityToUpdate,
  handleClose,
}) => {
  const [community, setCommunity] = useState<Community>(
    communityToUpdate ?? emptyCommunity,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(community);
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
      <DialogTitle>{formTexts.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{formTexts.description}</DialogContentText>
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
        <SubmitButton type="submit">{formTexts.submitText}</SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { CommunityForm };
