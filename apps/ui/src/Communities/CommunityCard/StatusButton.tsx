import { Button } from "@mui/material"
import defaultTheme from "../../themes/default"

export interface CommunityCardProps {
    joined: boolean;
    setJoined: React.Dispatch<React.SetStateAction<boolean>>
  }

const StatusButton: React.FC<CommunityCardProps> = ({joined, setJoined}) => {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={() => setJoined((prev) => !prev)}
            sx={{
              backgroundColor: joined
                ? defaultTheme.palette.success.contrastText
                : defaultTheme.palette.primary.light,
              color: joined 
                ? defaultTheme.palette.info.dark
                : defaultTheme.palette.info.main
              
            }}
          >
            {!joined ? 'Ask to Join' : 'Joined'}
          </Button>
    )
}

export { StatusButton }