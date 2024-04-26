import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import defaultTheme from "../themes/default";
import { TEXT } from "../themes/default/consts";

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
        const communityName = formJson.communityName;
        const description = formJson.description;
        const newCommunity = {
            name: communityName,
            description
        }
        console.log({newCommunity});
        
        //TODO - submit newCommunity
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
            <DialogTitle>{TEXT.CREATE_COMMUNITY}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {TEXT.CREATE_COMMUNITY_DESCRIPTION}
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
              <Button onClick={handleClose}>{TEXT.CANCEL}</Button>
              <Button 
                type="submit" 
                sx={{backgroundColor: defaultTheme.palette.primary.main, 
                    color: defaultTheme.palette.primary.contrastText, 
                    '&:hover': {
                        backgroundColor: defaultTheme.palette.action.hoverOpacity,
                        color: defaultTheme.palette.primary.main,
                      }}}
            >{TEXT.CREATE}</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export { CreateCommunityDialog }