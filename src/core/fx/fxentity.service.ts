import { EntityModel, Nullable } from "@flagcar/types";
import { HttpClient } from "../http/httpClient.service";
import { Entity } from "../models/entity";

export abstract class FxEntityService<T extends Entity> { 

  protected abstract entityUrl: string;

  constructor(
    protected readonly httpClient: HttpClient
  ) {  }

  public async enumerate(): Promise<T[]> {
    const results = await this.httpClient.enumerate<EntityModel<T>>(this.entityUrl);
    return results?.items;
  }

  public async get(id: number): Promise<Nullable<T>> {
    const results = await this.httpClient.get<EntityModel<T>>(this.entityUrl, id);
    return results?.item;
  }

  public async add(entity: T): Promise<Nullable<T>> {
    entity.id = 0;
    return this.postOperation(entity);
  }

  public async update(entity: T): Promise<Nullable<T>> {
    return this.postOperation(entity);
  }

  protected createEntityModel = (entity: T): EntityModel<T> => {
    return {
      item: entity,
      items: [entity]
    };
  }

  private postOperation = async (entity: T): Promise<Nullable<T>> => {
    const entityModel: EntityModel<T> = this.createEntityModel(entity);
    const results = await this.httpClient.post<EntityModel<T>>(this.entityUrl, entityModel);
    return results?.item;
  }

}