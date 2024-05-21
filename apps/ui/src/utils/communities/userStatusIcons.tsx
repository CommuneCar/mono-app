import { UserRideStatus, UserStatus } from '@communecar/types';
import {
  CheckRounded,
  HourglassEmptyRounded,
  BlockRounded,
  ManageAccountsRounded,
  DoNotDisturb,
} from '@mui/icons-material';

const communityStatusIcons: Record<UserStatus, JSX.Element> = {
  [UserStatus.ACTIVE]: <CheckRounded />,
  [UserStatus.PENDING]: <HourglassEmptyRounded />,
  [UserStatus.REJECTED]: <BlockRounded />,
  [UserStatus.MANAGER]: <ManageAccountsRounded />,
};

const rideStatusIcons: Record<UserRideStatus, JSX.Element> = {
  [UserRideStatus.CONFIRMED]: <CheckRounded />,
  [UserRideStatus.PENDING]: <HourglassEmptyRounded />,
  [UserRideStatus.REJECTED]: <BlockRounded />,
  [UserRideStatus.CANCELLED]: <DoNotDisturb />,
};

export { communityStatusIcons, rideStatusIcons };
