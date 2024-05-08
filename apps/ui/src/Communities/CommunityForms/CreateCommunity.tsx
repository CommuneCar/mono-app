import { Community } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useCreateCommunity } from '../../hooks/Communities/useCreateCommunity';

interface CreateCommunityProps {
  onCreate: (community: Community) => void;
  isOpen: boolean;
  handleClose: () => void;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  onCreate,
  isOpen,
  handleClose,
}) => {
  const { addCommunity } = useCreateCommunity();

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
      isOpen={isOpen}
      handleClose={handleClose}
      formTexts={FORMS_TEXT.CREATE_COMMUNITY}
      onSubmit={handleCreate}
    ></CommunityForm>
  );
};

export { CreateCommunity };
