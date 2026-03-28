

export interface Client {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    accountNumber: string;
    bankCard: string;
}
export type ClientKey = keyof Client;