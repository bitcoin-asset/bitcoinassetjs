export interface CreateResponse {
    success: boolean;
    message?: string;
    data?: {
        txid: string;
    }
}