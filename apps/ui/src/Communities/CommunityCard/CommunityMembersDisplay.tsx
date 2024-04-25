import { Avatar, AvatarGroup } from "@mui/material";

export interface CommunityMembersDisplayProps {
    pictures?: string[];
    total: number;
  }
  

const CommunityMembersDisplay: React.FC<CommunityMembersDisplayProps> = ({pictures, total}) => {
    return (
        <AvatarGroup total={total}>

        {pictures?.map((picture) => {
            return (
                <Avatar src={picture} />
            )
        })}
        </AvatarGroup>    
    )
}

export {CommunityMembersDisplay}