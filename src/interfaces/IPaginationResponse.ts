export interface IPaginationResponse<T> {
    elements: T[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
    };
}
