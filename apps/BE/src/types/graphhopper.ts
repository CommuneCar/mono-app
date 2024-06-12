export interface GraphHopperLocation {
    lat: number;
    long: number;
    name: string;
}

export interface GraphHopperActivity {
    type: string;
    location_id: string;
    address: {
        location_id: string;
        lat: number;
        lon: number;
    }
}