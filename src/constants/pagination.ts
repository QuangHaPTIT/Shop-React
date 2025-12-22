export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const SORT_OPTIONS = {
    UPDATED_AT: "UPDATED_AT_DESC",
    UPDATED_AT_ASC: "UPDATED_AT_ASC",
}
export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];

export interface Sort {
    value: SortOption;
    sort: string;
    order: string;
}

export const sorts = {
    [SORT_OPTIONS.UPDATED_AT]: {
        sort: "updatedAt",
        order: "desc",
    },
    [SORT_OPTIONS.UPDATED_AT_ASC]: {
        sort: "updatedAt",
        order: "asc",
    },
}