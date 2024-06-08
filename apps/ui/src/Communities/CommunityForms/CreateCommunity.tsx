import { Community, UserStatus } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';
import { useUserCommunity } from '../../hooks/Communities/useSelectUsers';

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
    newAdmins: number[],
    newMembers: number[],
  ) => {
    try {
      const admins = [...newAdmins, userId];
      const createdCommunity = await addCommunity(newCommunity);
      admins.forEach((admin) =>
        createUserCommunity({
          userId: admin,
          communityId: createdCommunity.id,
          status: UserStatus.MANAGER,
        }),
      );
      newMembers.forEach((current) =>
        createUserCommunity({
          userId: current,
          communityId: createdCommunity.id,
          status: UserStatus.ACTIVE,
        }),
      );

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
