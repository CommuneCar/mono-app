import { IconButton, Tooltip } from "@mui/material"
import { AddRounded, BlockRounded, CheckRounded, HourglassEmptyRounded } from "@mui/icons-material";
import { UserStatus } from "@communecar/types";
import { useCallback } from "react";

export interface CommunityCardProps {
    joined: boolean;
    setJoined: React.Dispatch<React.SetStateAction<boolean>>;
    status?: UserStatus;
  }

const StatusButton: React.FC<CommunityCardProps> = ({joined, setJoined, status}) => {
    const renderIcon = useCallback(() => {
      if( status === 'Approved') {
        return <CheckRounded />;
      } else if (status === "Pending") {
        return <HourglassEmptyRounded />;
      } else if (status === "Rejected") {
        return <BlockRounded /> 
      } else {       
          return <AddRounded />
      }
    }, [joined, status]);
    
    
    return (
      <Tooltip title={status ? status : "Ask To Join"}>
        <IconButton 
          onClick={() => setJoined(prev => !prev)}
          disabled={status === "Rejected"}
        > {renderIcon()}</IconButton>
      </Tooltip>
    )

}

export { StatusButton }