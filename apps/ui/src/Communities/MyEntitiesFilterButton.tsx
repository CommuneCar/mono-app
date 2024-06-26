import { Box, FormControlLabel, Switch } from '@mui/material';

export interface MyEntitiesFilterButtonProps {
  lable: string;
  setShowMyEntities: (isOn: boolean) => void;
  showMyEntities: boolean;
  filter: (showMyEntities: boolean) => void;
}

const MyEntitiesFilterButton: React.FC<MyEntitiesFilterButtonProps> = ({
  lable,
  showMyEntities,
  setShowMyEntities,
  filter,
}) => {
  const handleToggleMyCommunities = () => {
    setShowMyEntities(!showMyEntities);
    filter(!showMyEntities);
  };
  return (
    <Box sx={{ alignSelf: 'start' }}>
      <FormControlLabel
        control={
          <Switch
            checked={showMyEntities}
            onChange={handleToggleMyCommunities}
          />
        }
        label={lable}
        labelPlacement="end"
      />
    </Box>
  );
};

export { MyEntitiesFilterButton };
