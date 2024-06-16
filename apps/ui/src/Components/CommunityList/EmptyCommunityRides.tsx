import { Card, CardContent, Typography } from '@mui/material';

interface EmptyCommunityRidesProps {
  messageText?: string;
}

const EmptyCommunityRides: React.FC<EmptyCommunityRidesProps> = ({
  messageText,
}) => {
  return (
    <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
      <CardContent>
        <Typography align={'left'} sx={{ fontSize: 14 }}>
          {messageText ??
            "Oops! It looks like you haven't joined any communities yet."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { EmptyCommunityRides };
