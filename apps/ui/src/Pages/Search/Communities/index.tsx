import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { Community } from '@communetypes/Community';

interface SelectCommunityProps {
  communities: Community[];
  selectedCommunity: Community | null;
  setSelectedCommunity: (community: Community | null) => void;
}

const SearchCommunities: React.FC<SelectCommunityProps> = ({ communities, selectedCommunity, setSelectedCommunity }) => {
  return (
    <Autocomplete
      value={selectedCommunity}
      onChange={(_, newValue) => setSelectedCommunity(newValue)}
      options={communities}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Community"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default SearchCommunities;
