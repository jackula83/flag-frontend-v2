export type Nullable<T> = T | undefined | null

export type EntityModel<T> = {
  Items: T[],
  Item: T
}

export interface AggregateRoot {
  id: number,
  uuid: string,
  deleteFlag: boolean,
  createdAt: Date,
  updatedAt?: Date,
  createdBy?: string,
  updatedBy?: string
}

export interface HttpService {
  get<TResponse>(id: number): Promise<Nullable<TResponse>>
  enumerate<TResponse>(): Promise<TResponse>
}

export interface LogService {
  info(message: string): void
  error(error: (Error | string)): void
}