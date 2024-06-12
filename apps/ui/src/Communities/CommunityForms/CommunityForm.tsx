import React, { useMemo, useState } from 'react';
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
import {
  Community,
  LocationResult,
  Location,
  UserStatus,
} from '@communecar/types';
import { SubmitButton } from '../../Components/styles/SubmitButton.styled';
import { TEXT } from '../../themes/default/consts';
import { SearchLocations } from '../../Pages/Search/Locations';
import { UsersSelector } from '../../Components/UsersSelector/UsersSelector';
import { useGetAllUsersOptions } from '../../hooks/Users/useGetAllUsersOptions';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { useUser } from '../../hooks/Users/useUser';

interface CommunityFormProps {
  isOpen: boolean;
  handleClose: () => void;
  communityToUpdate?: Community;
  formTexts: any;
  onSubmit: (
    community: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => void;
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
  const { user: currentUser } = useUser();

  const [community, setCommunity] = useState<Community>(
    communityToUpdate ?? emptyCommunity,
  );
  const [communityManagers, setCommunityManagers] = useState<
    UsersSelectorOption[]
  >([]);
  const [newCommunityMembers, setNewCommunityMembers] = useState<
    UsersSelectorOption[]
  >([]);

  const {
    data: usersOptions,
    isLoading: isGetAllUsersLoading,
    error: getAllUsersError,
  } = useGetAllUsersOptions();

  const adminOptions = useMemo(
    () =>
      usersOptions?.filter((user) => {
        const isCurrentUser = user.userId === currentUser?.id;
        const managesCurrentCommunity = user.communitiesStatus.some(
          (communityStatus) =>
            communityStatus.communityId === community.id &&
            communityStatus.status === UserStatus.MANAGER,
        );
        return !isCurrentUser && !managesCurrentCommunity;
      }) ?? [],
    [usersOptions, community.id],
  );
  const membersOptions = useMemo(
    () =>
      usersOptions?.filter((user) => {
        const isCurrentUser = user.userId === currentUser?.id;
        const isManagerOrActiveInCurrentCommunity = user.communitiesStatus.some(
          (communityStatus) =>
            communityStatus.communityId === community.id &&
            (communityStatus.status === UserStatus.MANAGER ||
              communityStatus.status === UserStatus.ACTIVE),
        );
        return !isCurrentUser && !isManagerOrActiveInCurrentCommunity;
      }) ?? [],
    [usersOptions, community.id],
  );

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
    onSubmit(community, communityManagers, newCommunityMembers);
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
        <Box sx={{ maxWidth: '350px', width: '100%' }}>
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
          <SearchLocations
            label="Base Location"
            onSelect={handleSelectLoaction}
            serachFieldvariant="standard"
            value={community.location?.name ?? undefined}
          />
          {!getAllUsersError && (
            <UsersSelector
              options={adminOptions}
              fieldLabel="Add Admins"
              isOptionsLoading={isGetAllUsersLoading}
              setSelectedUsersIds={setCommunityManagers}
            />
          )}
          {!getAllUsersError && (
            <UsersSelector
              options={membersOptions}
              fieldLabel="Add Members"
              isOptionsLoading={isGetAllUsersLoading}
              setSelectedUsersIds={setNewCommunityMembers}
            />
          )}
        </Box>
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
