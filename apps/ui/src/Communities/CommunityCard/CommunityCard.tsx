import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from '@mui/material';

import { UserStatus, Community } from '@communecar/types';

import {
  MEMBER_OPTIONS,
  MANAGER_OPTIONS,
} from '../../types/community-actions-enum';
import { StatusButton } from './StatusButton';
import defaultTheme from '../../themes/default';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { CardMenu } from '../../Components/CardMenu/CardMenu';
import { CommunityMembersDisplay } from './CommunityMembersDisplay';
import { membersStatus } from '../../utils/communities/membershipConsts';
import { useUserCommunityStatus } from '../../hooks/Communities/useRequstChangeUserStatus';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';
import { ExpandMoreContent } from './ExpandMoreContent/ExpandMoreContent';
import { useUser } from '../../hooks/Users/useUser';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export interface CommunityCardProps {
  community: Community;
  userStatus?: UserStatus;
  handleClickOnEdit: (communityToUpdate: Community) => void;
  userStatusIsLoading: boolean;
  userId: number;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  userStatus,
  handleClickOnEdit,
  userStatusIsLoading,
  userId,
}) => {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const { createMutation, deleteMutation, isCreatingStatus, isDeletingStatus } =
    useUserCommunityStatus(userId, Number(community.id));
  const { title, description, picturesUrl } = community;

  const isMember = userStatus && membersStatus.includes(userStatus);
  const onRequest = async () => {
    if (isMember) {
      await deleteMutation.mutateAsync();
    } else {
      await createMutation.mutateAsync(UserStatus.PENDING);
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

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { user } = useUser();

  return (
    <Box sx={{ marginBottom: '5%', width: '100%', maxWidth: 400 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardHeader
          title={title}
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
                userStatus === UserStatus.ACTIVE
              }
            />
          }
        />
        <CardActions>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <CommunityMembersDisplay pictures={picturesUrl} />
            <StatusButton
              onRequest={onRequest}
              status={userStatus}
              isLoading={
                userStatusIsLoading || isCreatingStatus || isDeletingStatus
              }
            />
          </Box>
          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ExpandMoreContent
              communityLocation={community.location}
              communityOwners={user ? [user, user, user, user] : []}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export { CommunityCard };
