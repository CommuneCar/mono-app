import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Value } from 'maplibre-gl';

export interface SearchProps {
  options: string[];
  handleChangeSearchValue: (value: string | undefined) => void;
}

const SearchBar: React.FC<SearchProps> = ({
  options,
  handleChangeSearchValue,
}) => {
  const handleChange = (_event: React.SyntheticEvent, value: Value) => {
    const searchValue = value ? value?.toString() : undefined;
    handleChangeSearchValue(searchValue);
  };

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        freeSolo
        id="options-search"
        options={options}
        sx={{ width: 300 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            InputProps={{
              ...params.InputProps,
              startAdornment: <Button startIcon={<SearchIcon />}></Button>,
            }}
          />
        )}
      />
    </Box>
  );
};

export { SearchBar };
