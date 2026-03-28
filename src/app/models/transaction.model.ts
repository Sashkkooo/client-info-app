export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionType = "Credit" | "Debit";

export interface Transaction {
    id: number;
    date: string;
    name: string;
    city: string;
    bic: string;
    bankCard: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
}