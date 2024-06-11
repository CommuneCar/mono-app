import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useUpdateCommunity } from '../../hooks/Communities/useUpdateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { getIsUserConnectedToCommunity } from './utils';

interface UpdateCommunityProps {
  onUpdate: (community: Community) => void;
  isOpen: boolean;
  handleClose: () => void;
  communityToUpdate: Community;
}

const UpdateCommunity: React.FC<UpdateCommunityProps> = ({
  onUpdate,
  isOpen,
  handleClose,
  communityToUpdate,
}) => {
  const { updateCommunity, isUpdating } = useUpdateCommunity();
  const {
    createUserCommunity,
    updateUserCommunity,
    isUpdating: isUpdatingUsers,
    isCreating: isCreatingUsers,
  } = useUserCommunity();

  const handleUpdate = async (
    newCommunity: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const updatedCommunity = await updateCommunity(newCommunity);
      const newAdminsToUpdate = newAdmins.filter((user) =>
        getIsUserConnectedToCommunity(user, updatedCommunity.id),
      );
      const newAdminsToCreate = newAdmins.filter(
        (user) => !getIsUserConnectedToCommunity(user, updatedCommunity.id),
      );
      newAdminsToCreate.forEach((admin) =>
        createUserCommunity({
          userId: admin.userId,
          communityId: communityToUpdate.id,
          status: UserStatus.MANAGER,
        }),
      );
      newAdminsToUpdate.forEach((admin) =>
        updateUserCommunity({
          userId: admin.userId,
          communityId: communityToUpdate.id,
          status: UserStatus.MANAGER,
        }),
      );

      const newMembersToUpdate = newMembers.filter((user) =>
        getIsUserConnectedToCommunity(user, updatedCommunity.id),
      );
      const newMembersToCreate = newMembers.filter(
        (user) => !getIsUserConnectedToCommunity(user, updatedCommunity.id),
      );
      newMembersToCreate.forEach((current) =>
        createUserCommunity({
          userId: current.userId,
          communityId: communityToUpdate.id,
          status: UserStatus.ACTIVE,
        }),
      );
      newMembersToUpdate.forEach((current) =>
        updateUserCommunity({
          userId: current.userId,
          communityId: communityToUpdate.id,
          status: UserStatus.ACTIVE,
        }),
      );
      onUpdate(updatedCommunity);
    } catch (err) {}
    handleClose();
  };
  return (
    <CommunityForm
      isOpen={isOpen}
      handleClose={handleClose}
      formTexts={FORMS_TEXT.UPDATE_COMMUNITY}
      onSubmit={handleUpdate}
      communityToUpdate={communityToUpdate}
      isLoading={isUpdating || isUpdatingUsers || isCreatingUsers}
    ></CommunityForm>
  );
};

export { UpdateCommunity };
