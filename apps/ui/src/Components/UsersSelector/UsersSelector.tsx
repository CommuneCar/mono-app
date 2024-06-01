import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { UsersSelectorOption } from '../../types/users-selector-option';

export interface UsersSelectorProps {
  options: UsersSelectorOption[];
  fieldLabel?: string;
  isOptionsLoading?: boolean;
  setSelectedUsersIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const UsersSelector: React.FC<UsersSelectorProps> = ({
  options,
  fieldLabel = 'Users',
  isOptionsLoading = false,
  setSelectedUsersIds,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<UsersSelectorOption[]>([]);

  const handleSelectUser = (
    _: React.SyntheticEvent<Element, Event>,
    value: UsersSelectorOption[],
    reason: string,
  ) => {
    if (reason === 'selectOption') {
      setSelectedUsers(value);
      const usersIds = value.map((currentOption) => currentOption.userId) ?? [];
      setSelectedUsersIds(usersIds);
    }
  };

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        options={options}
        loading={isOptionsLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={fieldLabel}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isOptionsLoading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        multiple
        filterSelectedOptions
        disableClearable
        onChange={handleSelectUser}
      />
    </Box>
  );
};

export { UsersSelector };
