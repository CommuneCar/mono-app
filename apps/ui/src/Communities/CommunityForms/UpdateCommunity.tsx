import { Community } from '@communecar/types';
import { CommunityForm } from './CommunityForm';
import { FORMS_TEXT } from '../../themes/default/consts';
import { useUpdateCommunity } from '../../hooks/Communities/useUpdateCommunity';

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
  const { updateCommunity } = useUpdateCommunity();

  const handleUpdate = async (newCommunity: Community) => {
    try {
      const updatedCommunity = await updateCommunity(newCommunity);
      onUpdate(updatedCommunity);
    } catch (err) {
      console.error('Failed to update community:', err);
    }
    handleClose();
  };
  return (
    <CommunityForm
      isOpen={isOpen}
      handleClose={handleClose}
      formTexts={FORMS_TEXT.UPDATE_COMMUNITY}
      onSubmit={handleUpdate}
      communityToUpdate={communityToUpdate}
    ></CommunityForm>
  );
};

export { UpdateCommunity };