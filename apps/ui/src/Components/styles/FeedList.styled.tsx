import List from '@mui/material/List';
import { styled } from '@mui/material';

const FeedList = styled(List)(() => ({
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxHeight: 'calc(100vh - 20rem)',
}));

export { FeedList };
