import { UserStatus } from '@communecar/types';
import {
  CheckRounded,
  HourglassEmptyRounded,
  BlockRounded,
  ManageAccountsRounded,
} from '@mui/icons-material';

const statusIcons: Record<UserStatus, JSX.Element> = {
  [UserStatus.ACTIVE]: <CheckRounded />,
  [UserStatus.PENDING]: <HourglassEmptyRounded />,
  [UserStatus.REJECTED]: <BlockRounded />,
  [UserStatus.MANAGER]: <ManageAccountsRounded />,
};

export { statusIcons };
