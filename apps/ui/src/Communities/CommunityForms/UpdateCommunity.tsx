import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useUpdateCommunity } from '../../hooks/Communities/useUpdateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';

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
  const { createUserCommunity } = useUserCommunity();

  const handleUpdate = async (
    newCommunity: Community,
    newAdmins: number[],
    newMembers: number[],
  ) => {
    try {
      const updatedCommunity = await updateCommunity(newCommunity);
      onUpdate(updatedCommunity);
      newAdmins.forEach((admin) =>
        createUserCommunity({
          userId: admin,
          communityId: communityToUpdate.id,
          status: UserStatus.MANAGER,
        }),
      );
      newMembers.forEach((current) =>
        createUserCommunity({
          userId: current,
          communityId: communityToUpdate.id,
          status: UserStatus.ACTIVE,
        }),
      );
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
      isLoading={isUpdating}
    ></CommunityForm>
  );
};

export { UpdateCommunity };
