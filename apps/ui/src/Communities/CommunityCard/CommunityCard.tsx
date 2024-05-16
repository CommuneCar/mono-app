import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';

import defaultTheme from '../../themes/default';

import { UserStatus, Community } from '@communecar/types';
import { StatusButton } from './StatusButton';
import { CardHeader, Grid } from '@mui/material';
import { CommunityMembersDisplay } from './CommunityMembersDisplay';
import { CardMenu } from '../../Components/CardMenu/CardMenu';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import { membersStatus } from '../../utils/communities/membershipConsts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MANAGER_OPTIONS,
  MEMBER_OPTIONS,
} from '../../types/community-actions-enum';

export interface CommunityCardProps {
  community: Community;
  userStatus: UserStatus;
  handleClickOnEdit: (communityToUpdate: Community) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  userStatus,
  handleClickOnEdit,
}) => {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();

  const { name, description, picturesUrl } = community;
  const [status, setStatus] = useState<UserStatus | undefined>(userStatus);

  const isMember = status ? membersStatus.includes(status) : false;

  const onJoinRequest = () => {
    if (isMember) {
      //TODO: Request to cancel community membership
      setStatus(undefined);
    } else {
      //TODO: Request to join the community
      setStatus(UserStatus.PENDING);
    }
    showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
  };

  const handleEditClick = () => {
    handleClickOnEdit(community);
  };

  const handleJumpToRides = () => {
    navigate('/home', { state: { communityId: community.id } });
  };

  const optionActions: Record<string, () => void> = {
    [MANAGER_OPTIONS.EDIT]: handleEditClick,
    [MEMBER_OPTIONS.SEE_RIDES]: handleJumpToRides,
  };

  return (
    <Box sx={{ marginBottom: '5%', width: '100%', maxWidth: 400 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardHeader
          title={name}
          titleTypographyProps={{
            variant: 'subtitle1',
            color: defaultTheme.palette.text.primary,
            align: 'left',
          }}
          subheader={description}
          subheaderTypographyProps={{
            variant: 'body2',
            color: defaultTheme.palette.text.secondary,
            align: 'left',
          }}
          action={
            <CardMenu
              isManager={userStatus === UserStatus.MANAGER}
              optionActions={optionActions}
              isMember={
                userStatus === UserStatus.MANAGER ||
                userStatus === UserStatus.APPROVED
              }
            />
          }
        />
        <CardActions>
          <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <CommunityMembersDisplay
                pictures={picturesUrl}
              ></CommunityMembersDisplay>
            </Grid>
            <Grid item xs={6}>
              <StatusButton
                onJoinRequest={onJoinRequest}
                status={status}
              ></StatusButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CommunityCard;
