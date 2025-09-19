export interface Update {
    id: string;
    title: string;
    description: string;
    date: string;
}

export interface ApiResponse {
    updates: Update[];
    total: number;
}