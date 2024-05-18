import { Community } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';

interface CreateCommunityProps {
  onCreate: (community: Community) => void;
  isOpen: boolean;
  handleClose: () => void;
  user: number;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  onCreate,
  isOpen,
  handleClose,
  user,
}) => {
  const {
    addCommunity,
    error: addCommunityError,
    isLoading: addCommunityIsLoading,
  } = useCreateCommunity(user);

  const handleCreate = async (newCommunity: Community) => {
    try {
      const createdCommunity = await addCommunity(newCommunity);
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
