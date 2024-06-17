export interface Address {
    location_id?: string;
    lat: number;
    lon: number;
}

export interface Vehicle {
    vehicle_id: string;
    start_address: Address;
    end_address: Address;
}

export interface Service {
    id: string;
    name: string;
    address: Address;
}

export interface GraphHopperResponse {
    solution: {
        routes: Array<{
            activities: Array<{
                address: Address;
            }>;
        }>;
    };
}
