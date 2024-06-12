import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useUpdateCommunity } from '../../hooks/Communities/useUpdateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';
import { UsersSelectorOption } from '../../types/users-selector-option';
import {
  getIntersectionManagersMembers,
  getIsUserConnectedToCommunity,
} from './utils';

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
      handleConnectUsersInUpdate(updatedCommunity.id, newAdmins, newMembers);
      onUpdate(updatedCommunity);
    } catch (err) {}
    handleClose();
  };

  const handleConnectUsersInUpdate = (
    communityId: number,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    const { adminsResults, membersResults } = getIntersectionManagersMembers(
      newAdmins,
      newMembers,
      (user) => user.userId,
    );

    const newAdminsToUpdate = adminsResults.filter((user) =>
      getIsUserConnectedToCommunity(user, communityId),
    );
    const newAdminsToCreate = adminsResults.filter(
      (user) => !getIsUserConnectedToCommunity(user, communityId),
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

    const newMembersToUpdate = membersResults.filter((user) =>
      getIsUserConnectedToCommunity(user, communityId),
    );
    const newMembersToCreate = membersResults.filter(
      (user) => !getIsUserConnectedToCommunity(user, communityId),
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
