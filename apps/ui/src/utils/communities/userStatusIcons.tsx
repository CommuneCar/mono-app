import { UserStatus } from '@communecar/types';
import {
  CheckRounded,
  HourglassEmptyRounded,
  BlockRounded,
  ManageAccountsRounded,
} from '@mui/icons-material';

const statusIcons: Record<UserStatus, JSX.Element> = {
  [UserStatus.APPROVED]: <CheckRounded />,
  [UserStatus.PENDING]: <HourglassEmptyRounded />,
  [UserStatus.REJECTED]: <BlockRounded />,
  [UserStatus.MANAGER]: <ManageAccountsRounded />,
};

export { statusIcons };
