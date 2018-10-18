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

export const EmptyGuid = "00000000-0000-0000-0000-000000000000";