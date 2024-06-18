import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { UsersSelectorOption } from '../../types/users-selector-option';

export interface UsersSelectorProps {
  options: UsersSelectorOption[];
  fieldLabel?: string;
  isOptionsLoading?: boolean;
  setSelectedUsersIds: React.Dispatch<
    React.SetStateAction<UsersSelectorOption[]>
  >;
  disabled?: boolean;
}

const UsersSelector: React.FC<UsersSelectorProps> = ({
  options,
  fieldLabel = 'Users',
  isOptionsLoading = false,
  setSelectedUsersIds,
  disabled = false,
}) => {
  const handleSelectUser = (
    _: React.SyntheticEvent<Element, Event>,
    value: UsersSelectorOption[],
    reason: string,
  ) => {
    if (reason === 'selectOption') {
      setSelectedUsersIds(value);
    }
  };

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        options={options}
        loading={isOptionsLoading}
        disabled={disabled}
        renderInput={(params) => {
          const { InputProps, ...other } = params;
          return (
            <TextField
              {...other}
              label={fieldLabel}
              variant="standard"
              InputProps={{
                ...InputProps,
                endAdornment: (
                  <>
                    {isOptionsLoading ? <CircularProgress size={20} /> : null}
                    {InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
        multiple
        filterSelectedOptions
        disableClearable
        onChange={handleSelectUser}
      />
    </Box>
  );
};

export { UsersSelector };
