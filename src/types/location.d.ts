interface Address {
    streetAddress: string;
    latitude: number;
    longitude: number;
    apartment?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
}

declare interface Coordinates {
    latitude: number | string;
    longitude: number | string;
}

declare interface IPLocationResponse {
    countryCode: string;
    countryName: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
}
