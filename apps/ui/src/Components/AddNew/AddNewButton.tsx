import { Tooltip, Fab } from '@mui/material';
import defaultTheme from '../../themes/default';
import AddIcon from '@mui/icons-material/Add';

interface AddNewButtonProps {
  handleAddClick: (event: React.MouseEvent) => void;
  tooltipText: string;
}

const AddNewButton: React.FC<AddNewButtonProps> = ({
  handleAddClick,
  tooltipText,
}) => {
  return (
    <Tooltip title={tooltipText}>
      <Fab
        color="default"
        onClick={handleAddClick}
        sx={{
          position: 'fixed',
          bottom: '0%',
          right: '1%',
          margin: '1%',
        }}
      >
        <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
      </Fab>
    </Tooltip>
  );
};

export { AddNewButton };
