import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { UsersSelectorOption } from '../../types/users-selector-option';

export interface UsersSelectorProps {
  options: UsersSelectorOption[];
  fieldLabel?: string;
}

const UsersSelector: React.FC<UsersSelectorProps> = ({
  options,
  fieldLabel = 'Users',
}) => {
  console.log({ options });

  const [selectedUsers, setSelectedUsers] = useState<UsersSelectorOption[]>([]);

  const handleSelectUser = (
    _: React.SyntheticEvent<Element, Event>,
    value: UsersSelectorOption[],
    reason: string,
  ) => {
    if (reason === 'selectOption') {
      setSelectedUsers(value);
    }
    console.log({ value });
  };

  return (
    <Box>
      <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} label={fieldLabel} />}
        multiple
        filterSelectedOptions
        disableClearable
        onChange={handleSelectUser}
      />
    </Box>
  );
};

export { UsersSelector };
