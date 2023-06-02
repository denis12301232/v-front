export * from './models';
export * from './http';
export * from './io';
export * from './i18n';

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export interface Pagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
}

export interface PaginationRequest {
  limit: number;
  page: number;
  filter: string;
  sort: string;
  descending: boolean;
}

export type ChatModal =
  | 'modal:group-create'
  | 'modal:group-info'
  | 'modal:group-settings'
  | 'modal:group-add-user'
  | 'modal:open-image';
