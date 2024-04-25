import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import defaultTheme from "../themes/default";

interface CreateCommunityDialogProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
  }

const CreateCommunityDialog:React.FC<CreateCommunityDialogProps> = ({isOpen, setIsOpen}) => {
    const handleClickOpen = () => {
        setIsOpen(true);
      };
    
      const handleClose = () => {
        setIsOpen(false);
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());    
        // const startLocation = formJson.startLocation;
        // const destination = formJson.destination;
        // const communityName = formJson.communityName;
        // rides.push({
        //   communityName,
        //   driver,
        //   departureTime,
        //   startLocation,
        //   destination,
        //   png,
        // });
        handleClose();
      }
    
      return (
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
          </Button>
          <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}
          >
            <DialogTitle>Create Community</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a Community, please fill all details here.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="communityName"
                name="communityName"
                label="Community Name"
                type="communityName"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="description"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                type="submit" 
                sx={{backgroundColor: defaultTheme.palette.primary.main, 
                    color: defaultTheme.palette.primary.contrastText, 
                    '&:hover': {
                        backgroundColor: defaultTheme.palette.action.hoverOpacity,
                        color: defaultTheme.palette.primary.main,
                      }}}
            >Create</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export { CreateCommunityDialog }