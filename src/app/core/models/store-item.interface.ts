export interface StoreItem<T> {
  data: T;
  loadings: Record<string, boolean>;
  errors: Record<string, string>;
}
