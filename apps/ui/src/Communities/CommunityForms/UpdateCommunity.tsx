import { Community } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useUpdateCommunity } from '../../hooks/Communities/useUpdateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { getAdditionsDetailForCommunity } from './utils';
import { useUser } from '../../hooks/Users/useUser';

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
  const { isUpdating: isUpdatingUsers, isCreating: isCreatingUsers } =
    useUserCommunity();
  const { user } = useUser();

  const handleUpdate = async (
    newCommunity: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const updatedCommunity = await updateCommunity(
        newCommunity,
        newAdmins,
        newMembers,
      );

      const { ownersUsers, numberOfMembers, picturesUrl } =
        getAdditionsDetailForCommunity(
          newAdmins,
          newMembers,
          updatedCommunity,
          user,
        );
      updatedCommunity.picturesUrl = picturesUrl;
      updatedCommunity.ownersUsers = ownersUsers;
      updatedCommunity.numberOfMembers = numberOfMembers;
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
