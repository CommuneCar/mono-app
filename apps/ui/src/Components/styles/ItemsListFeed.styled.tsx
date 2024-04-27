import { Box, styled } from '@mui/material';
import { pxToRem } from '../../themes/default/utils';

const ItemsListFeed = styled(Box)`
  position: relative;
  width: 100%;
  max-width: ${pxToRem(400)};
  box-sizing: border-box;
  margin-top: auto;
  top: ${pxToRem(20)};
  padding-top: ${pxToRem(60)};
  margin: 5%;
  padding-left: 2%;
  padding-right: 2%;
`;

export { ItemsListFeed };
