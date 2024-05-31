import React, { useState } from 'react';
import {
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Box,
} from '@mui/material';
import { Community, LocationResult, Location } from '@communecar/types';
import { SubmitButton } from '../../Components/styles/SubmitButton.styled';
import { TEXT } from '../../themes/default/consts';
import { SearchLocations } from '../../Pages/Search/Locations';
import { UsersSelector } from '../../Components/UsersSelector/UsersSelector';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { useGetAllUsersOptions } from '../../hooks/Users/useGetAllUsersOptions';

interface CommunityFormProps {
  isOpen: boolean;
  handleClose: () => void;
  communityToUpdate?: Community;
  formTexts: any;
  onSubmit: (community: Community) => void;
  isLoading?: boolean;
}

const emptyCommunity: Community = {
  id: -1,
  title: '',
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
  isLoading = false,
}) => {
  const [community, setCommunity] = useState<Community>(
    communityToUpdate ?? emptyCommunity,
  );

  const {
    data: usersOptions,
    isLoading: isGetAllUsersLoading,
    error: getAllUsersError,
  } = useGetAllUsersOptions();

  // const usersOptions: UsersSelectorOption[] = [
  //   { userId: 3, label: 'zoe shwartz', email: 'jojo', phone: '050' },
  // ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectLoaction = (locationResult: LocationResult) => {
    const { lat, lon, displayName } = locationResult;
    const location: Location = {
      lat: Number(lat),
      lon: Number(lon),
      name: displayName,
    };
    setCommunity((prev) => ({ ...prev, location: location }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(community);
  };

  const submitButton = () => {
    if (isLoading) {
      return <CircularProgress size={24} color="info" />;
    }
    return <>{formTexts.submitText}</>;
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
          id="communityTitle"
          name="title"
          label="Community Title"
          type="communityTitle"
          variant="standard"
          margin="dense"
          autoFocus
          required
          fullWidth
          value={community.title}
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
        <Box sx={{ maxWidth: '350px', width: '100%' }}>
          <SearchLocations
            label="Base Location"
            onSelect={handleSelectLoaction}
            serachFieldvariant="standard"
          />
        </Box>
        <UsersSelector options={usersOptions ?? []} fieldLabel="Add Admins" />
        <UsersSelector options={usersOptions ?? []} fieldLabel="Add Members" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          {TEXT.CANCEL}
        </Button>
        <SubmitButton type="submit" disabled={isLoading}>
          {submitButton()}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { CommunityForm };
