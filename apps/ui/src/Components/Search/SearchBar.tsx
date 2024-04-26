import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Value } from 'maplibre-gl';

export interface SearchProps {
    options: string[];
    onChange: any
  }

const SearchBar: React.FC<SearchProps> = ({ options, onChange }) => {

  const handleChange = (event: React.SyntheticEvent, value: Value) => {
    const searchValue = value ? value?.toString() : undefined;
    console.log({value});
    
    onChange(searchValue);
  }

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        
        freeSolo
        id="options-search"
        options={options}
        sx={{ width: 300 }}
        onChange={handleChange}
        renderInput={
          (params) => 
            <TextField {...params} 
            label="Search" 
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <Button
                  // onClick={handleChange}
                  startIcon={<SearchIcon />}
                ></Button>
              ),
            }} 
            />
        }
      />
    </Box>
  );
}

export { SearchBar }