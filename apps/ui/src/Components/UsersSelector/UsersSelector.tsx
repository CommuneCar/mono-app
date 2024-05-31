import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { UsersSelectorOption } from '../../types/users-selector-option';

export interface UsersSelectorProps {
  options: UsersSelectorOption[];
  fieldLabel?: string;
  isOptionsLoading?: boolean;
}

const UsersSelector: React.FC<UsersSelectorProps> = ({
  options,
  fieldLabel = 'Users',
  isOptionsLoading = false,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<UsersSelectorOption[]>([]);

  const handleSelectUser = (
    _: React.SyntheticEvent<Element, Event>,
    value: UsersSelectorOption[],
    reason: string,
  ) => {
    if (reason === 'selectOption') {
      setSelectedUsers(value);
    }
  };

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        options={[]}
        renderInput={(params) =>
          isOptionsLoading ? (
            <CircularProgress sx={{ alignSelf: 'center' }} />
          ) : (
            <TextField {...params} label={fieldLabel} variant="standard" />
          )
        }
        multiple
        filterSelectedOptions
        disableClearable
        onChange={handleSelectUser}
      />
    </Box>
  );
};

export { UsersSelector };
