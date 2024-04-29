import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Value } from 'maplibre-gl';
import { useRef } from 'react';

export interface SearchBarProps {
  options: string[];
  handleChangeSearchValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  options,
  handleChangeSearchValue,
}) => {
  const textRef: React.Ref<any> = useRef();

  const handleChange = (_event: React.SyntheticEvent, value: Value) => {
    const searchValue = value ? value?.toString() : '';
    handleChangeSearchValue(searchValue);
  };

  const handleClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const searchValue = textRef?.current?.value
      ? textRef.current.value.toString()
      : undefined;
    handleChangeSearchValue(searchValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        alignSelf: 'center',
      }}
    >
      <Autocomplete
        freeSolo
        id="options-search"
        options={options}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            inputRef={textRef}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <IconButton onClick={handleClick}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export { SearchBar };
