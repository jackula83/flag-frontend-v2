export type Nullable<T> = T | undefined | null

export type EntityModel<T> = {
  Items: T[],
  Item: T
}