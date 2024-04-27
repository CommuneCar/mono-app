import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import defaultTheme from '../themes/default';
import { ClientCommunity } from '../types/community-type';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { SearchBar } from '../Components/Search/SearchBar';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface CommunitiesFeedProps {
  communities: ClientCommunity[];
}

const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  const userCommunitiesStatus = useUserCommunitiesStatus('hi');
  const [filteredCommuniuties, setFilteredCommuniuties] = useState(communities);
  const [searchValue, setSearchValue] = useState<string>();

  const options = useMemo(
    () => communities.map((community) => community.name),
    [communities],
  );

  const handleChangeSearchValue = (value: string | undefined) => {
    const lowerCaseValue = value?.toLowerCase();
    setSearchValue(lowerCaseValue);
    filterDisplay(lowerCaseValue);
  };

  const filterDisplay = useCallback(
    (value: string | undefined) => {
      const newFilteredCommuniuties = value
        ? communities.filter((community) =>
            community.name.toLowerCase().includes(value),
          )
        : communities;
      setFilteredCommuniuties(newFilteredCommuniuties);
    },
    [communities],
  );

  useEffect(() => {
    filterDisplay(searchValue);
  }, [communities]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="add"
          sx={{
            '&:hover': {
              backgroundColor: defaultTheme.palette.action.hover,
            },
          }}
        >
          <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
        </IconButton>
        <SearchBar
          options={options}
          handleChangeSearchValue={handleChangeSearchValue}
        ></SearchBar>
      </Box>
      {filteredCommuniuties.map((community, index) => (
        <CommunityCard
          community={community}
          userStatus={userCommunitiesStatus[community.name]}
          key={index}
        />
      ))}
    </Box>
  );
};

export default CommunitiesFeed;
