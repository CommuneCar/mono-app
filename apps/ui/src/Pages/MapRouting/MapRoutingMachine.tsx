import { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { Routing } from './Routing';
import { useGetTrip } from '../../hooks/Rides/useGetTrip';
import { useParams } from 'react-router-dom';
import Control from 'react-leaflet-custom-control';
import { ButtonGroup, Button, Tooltip } from '@mui/material';
import { PriceChange as PaymentIcon } from '@mui/icons-material';
import { RideFeeDialog, RideFeeDialogHandle } from './RideFeeDialog';
import { DEFAULT_RIDE_FEE } from './const';

function MapRouting() {
    const { rideId } = useParams();
    const { data, isLoading, error } = useGetTrip(Number(rideId));
    const dialogRef = useRef<RideFeeDialogHandle>(null);

    if (!rideId || isNaN(Number(rideId))) {
        return <div>Invalid ride id</div>;
    }

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Error: {error?.message ?? "failed to fetch data about the provided ride"}</div>;

    const validLocations = data.stops?.filter(loc =>
        loc.lat >= -90 && loc.lat <= 90 &&
        loc.long >= -180 && loc.long <= 180 &&
        !(loc.lat === 1.5 && loc.long === 1.5)
    ) || [];

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.open();
        }
    };

    return (
        <MapContainer style={{
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            left: '0',
            top: '0',
            float: 'left',
            marginLeft: 0,
        }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing waypoints={validLocations} dialogRef={dialogRef} passengersCount={data.passengersCount} />
            <Control position="topright">
                <ButtonGroup orientation="vertical" variant="contained">
                    <Tooltip placement="left" title="Calculate Fare">
                        <Button
                            onClick={handleOpenDialog}
                            variant="contained"
                        >
                            <PaymentIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </Control>
            <RideFeeDialog ref={dialogRef} defaultRideFee={DEFAULT_RIDE_FEE} />
        </MapContainer>
    );
}

export { MapRouting };
