export interface IGetAllDocDB {
    query: Record<string, any>;
    page: number;
    limit: number;
    sort: Record<string, any>;
}

export interface IGetAllDocDBCursor {
    query: Record<string, any>;
    limit: number;
    sort: Record<string, 1 | -1>;
    cursor?: string | undefined | null;
}