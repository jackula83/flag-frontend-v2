export type Nullable<T> = T | undefined | null

export type EntityModel<T> = {
  Items: T[],
  Item: T
}

export interface HttpClient {
  get<TResponse>(url: string, id: number): Promise<Nullable<TResponse>>
  enumerate<TResponse>(url: string): Promise<TResponse>
}

export interface LogService {
  info(message: string): void
  error(error: (Error | string)): void
}