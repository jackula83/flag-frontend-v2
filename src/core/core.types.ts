export type Nullable<T> = T | undefined | null

export type EntityModel<T> = {
  items: T[],
  item: T
}