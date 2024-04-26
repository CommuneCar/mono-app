import { UserStatus } from "@communecar/types";
import { CheckRounded, HourglassEmptyRounded, BlockRounded } from "@mui/icons-material";

const statusIcons: Record<UserStatus, JSX.Element> = {
    [UserStatus.APPROVED]: <CheckRounded />,
    [UserStatus.PENDING]: <HourglassEmptyRounded />,
    [UserStatus.REJECTED]: <BlockRounded />,
  };

  export { statusIcons }