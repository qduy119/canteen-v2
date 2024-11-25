export type PaginationResponseType<T> = {
  data: T[];
  total_pages?: number;
}