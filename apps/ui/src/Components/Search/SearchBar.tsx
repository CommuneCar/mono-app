import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface SearchProps {
    options: string[];
    onChange: any
  }

const SearchBar: React.FC<SearchProps> = ({ options, onChange }) => {
  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
      <Autocomplete
        
        freeSolo
        id="options-search"
        options={options}
        sx={{ width: 300 }}
        onChange={onChange}
        renderInput={
          (params) => 
            <TextField {...params} 
            label="Search" 
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <Button
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