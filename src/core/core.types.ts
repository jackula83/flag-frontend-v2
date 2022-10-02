import { Entity } from "./models/entity"

export type Nullable<T> = T | undefined | null

export type EntityModel<T extends Entity> = {
  items: T[],
  item: T
}