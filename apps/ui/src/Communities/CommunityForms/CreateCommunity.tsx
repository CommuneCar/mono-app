import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';
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
  onCreateConnections: () => void;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  onCreate,
  isOpen,
  handleClose,
  userId,
  onCreateConnections,
}) => {
  const { addCommunity, isLoading: addCommunityIsLoading } =
    useCreateCommunity(userId);
  const { createUserCommunity } = useUserCommunity();
  const { user } = useUser();

  const handleCreate = async (
    newCommunity: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const createdCommunity = await addCommunity(newCommunity);

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
      await handleConnectUsers(createdCommunity.id, newAdmins, newMembers);
      onCreateConnections();
    } catch (err) {
      console.error('Failed to create community:', err);
    }
    handleClose();
  };

  const handleConnectUsers = async (
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

    const adminsResults = admins.map((admin) =>
      createUserCommunity({
        userId: admin,
        communityId: createdCommunityId,
        status: UserStatus.MANAGER,
      }),
    );

    const membersResults = members.map((current) =>
      createUserCommunity({
        userId: current,
        communityId: createdCommunityId,
        status: UserStatus.ACTIVE,
      }),
    );
    Promise.all([...adminsResults, ...membersResults]);
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
