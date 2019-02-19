export interface CreateRequest{
    asset: {
        dataUrl: string;
        dataSchemaUrl?: string;
        dataSchemaType?: string;
        metadataUrl: string;
        metadataSchemaUrl?: string;
        metadataSchemaType?: string;
        immutableUrl: string;
        immutableSchemaUrl?: string;
        immutableSchemaType?: string;
        updateAddress: string;
    },
    pay: {
        key: string;
    }
}