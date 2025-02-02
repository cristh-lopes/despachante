export interface Column<T, K extends keyof T> {
  title: string;
  key: K;
  format?: (value: T) => string;
}