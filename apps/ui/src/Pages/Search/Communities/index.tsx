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
      getOptionLabel={(option) => option.name || ""}
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
