import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { getIntersectionManagersMembers } from './utils';

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
  const { createUserCommunity } = useUserCommunity();

  const handleCreate = async (
    newCommunity: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const createdCommunity = await addCommunity(newCommunity);
      handleConnectUsers(createdCommunity.id, newAdmins, newMembers);
      onCreate(createdCommunity);
    } catch (err) {
      console.error('Failed to create community:', err);
    }
    handleClose();
  };

  const handleConnectUsers = (
    createdCommunityId: number,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    const { adminsResults: admins, membersResults: members } =
      getIntersectionManagersMembers(
        [...newAdmins.map((admin) => admin.userId), userId],
        newMembers.map((member) => member.userId),
        (userId) => userId,
      );

    admins.forEach((admin) =>
      createUserCommunity({
        userId: admin,
        communityId: createdCommunityId,
        status: UserStatus.MANAGER,
      }),
    );
    members.forEach((current) =>
      createUserCommunity({
        userId: current,
        communityId: createdCommunityId,
        status: UserStatus.ACTIVE,
      }),
    );
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
