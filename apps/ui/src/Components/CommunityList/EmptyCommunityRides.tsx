import { Card, CardContent, Typography } from '@mui/material';

interface EmptyCommunityRidesProps {
  communityTitle?: string;
}

const EmptyCommunityRides: React.FC<EmptyCommunityRidesProps> = ({
  communityTitle,
}) => {
  const text = communityTitle
    ? `Sorry, No rides available for community: "${communityTitle}" for now`
    : 'Sorry, No rides available in the community for now';
  return (
    <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
      <CardContent>
        <Typography align={'left'} sx={{ fontSize: 14 }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { EmptyCommunityRides };
