import { Community } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';
import { UsersSelectorOption } from '../../types/users-selector-option';
import {
  getAdditionsDetailForCommunity,
  getIntersectionManagersMembers,
} from './utils';
import { useUser } from '../../hooks/Users/useUser';

interface CreateCommunityProps {
  onCreate: (community: Community) => void;
  isOpen: boolean;
  handleClose: () => void;
  userId: number;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  onCreate,
  isOpen,
  handleClose,
  userId,
}) => {
  const { addCommunity, isLoading: addCommunityIsLoading } =
    useCreateCommunity(userId);
  const { user } = useUser();

  const handleCreate = async (
    newCommunity: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const { adminsResults: admins, membersResults: members } =
        getIntersectionManagersMembers(
          [...newAdmins.map((admin) => admin.userId), userId],
          newMembers.map((member) => member.userId),
          (userId) => userId,
        );
      const createdCommunity = await addCommunity(
        newCommunity,
        admins,
        members,
      );

      const { ownersUsers, numberOfMembers, picturesUrl } =
        getAdditionsDetailForCommunity(
          newAdmins,
          newMembers,
          createdCommunity,
          user,
        );
      createdCommunity.picturesUrl = picturesUrl;
      createdCommunity.ownersUsers = ownersUsers;
      createdCommunity.numberOfMembers = numberOfMembers;

      onCreate(createdCommunity);
    } catch (err) {
      console.error('Failed to create community:', err);
    }
    handleClose();
  };

  return (
    <CommunityForm
      isOpen={isOpen && true}
      handleClose={handleClose}
      formTexts={FORMS_TEXT.CREATE_COMMUNITY}
      onSubmit={handleCreate}
      isLoading={addCommunityIsLoading}
    ></CommunityForm>
  );
};

export { CreateCommunity };
