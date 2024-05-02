import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Community } from '@communecar/types';

interface CommunityFormProps {
  communityToUpdate?: Community;
  onCreate: (community: Community) => void;
  onUpdate: (community: Community) => void;
}

const CommunityForm: React.FC<CommunityFormProps> = ({
  communityToUpdate,
  onCreate,
  onUpdate,
}) => {
  const [community, setCommunity] = useState<Community>({
    name: '',
    description: '',
    numberOfMembers: 0,
    picturesUrl: [],
  });

  useEffect(() => {
    if (communityToUpdate) {
      setCommunity(communityToUpdate);
    }
  }, [communityToUpdate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (communityToUpdate) {
      onUpdate(community);
    } else {
      onCreate(community);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={community.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        value={community.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        {communityToUpdate ? 'Update Community' : 'Create Community'}
      </Button>
    </Box>
  );
};

export { CommunityForm };
