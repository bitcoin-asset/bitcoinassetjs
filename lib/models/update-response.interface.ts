export interface UpdateResponse {
    success: boolean;
    message?: string;
    data?: {
        txid: string;
    }
}