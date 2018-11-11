export interface IUser {
    name: string;
    token: string;
}

export interface IGame {
    id: string;
    user1: string;
    user2: string;
    user3: string;
    user4: string;
    admin: string;
    active: boolean;
}

export interface IIsland {
    id: string;
}

export interface IGeks {
    coordinates: IGeksCoordinates;
    identifier: number; // geks type
    token: number;
}

export interface IGeksCoordinates {
    n:  number;
    ne: number;
    nw: number;
    s:  number;
    se: number;
    sw: number;
}

export const EmptyGuid = "00000000-0000-0000-0000-000000000000";