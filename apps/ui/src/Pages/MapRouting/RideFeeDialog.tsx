// RideCostDialog.tsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const RideFeeImage = "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/share_ride_fee.png";

export interface RideFeeDialogHandle {
  open: () => void;
  close: () => void;
  updateFare: (newFare: number) => void;
}

interface FareDialogProps {
  defaultRideFee: number;
}

const RideFeeDialog = forwardRef<RideFeeDialogHandle, FareDialogProps>(({ defaultRideFee }, ref) => {
  const [open, setOpen] = useState(false);
  const [fare, setFare] = useState(defaultRideFee);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    updateFare: (newFare) => setFare(newFare),
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Let's Share the Journey!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Each otter chips in {fare}₪ to keep us swimming smoothly!
        </DialogContentText>
        <img src={RideFeeImage} alt="Sharing the Ride" style={{ marginTop: '20px', width: '100%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          All Set
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export { RideFeeDialog };
