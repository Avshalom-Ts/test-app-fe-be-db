export interface StoreName {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface StoreNameCreate {
    name: string;
    description: string;
}

export interface StoreNameUpdate extends Partial<StoreNameCreate> { }