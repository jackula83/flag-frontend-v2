import { Injectable } from "@nestjs/common";
import { EntityModel, Nullable } from '../../core/core.types';
import { ConfigService } from '@nestjs/config';
import { Flag } from './models/flag.model';
import { HttpClient } from "../../core/http/httpClient.service";

@Injectable()
export class FlagService {

  private url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) {
    const flagServiceUrl = process.env.FlagService__Url 
      ?? this.configService.get<string>('FLAGSERVICE_URL');
    const flagServicePort = process.env.FlagService__Port
      ?? this.configService.get<string>('FLAGSERVICE_PORT');
    const baseUrl = `http://${flagServiceUrl}:${flagServicePort}/api`;
    this.url = `${baseUrl}/flagEntity`;
  }

  public async enumerate(): Promise<Flag[]> {
    const results = await this.httpClient.enumerate<EntityModel<Flag>>(this.url);
    return results?.items;
  }

  public async get(id: number): Promise<Nullable<Flag>> {
    const results = await this.httpClient.get<EntityModel<Flag>>(this.url, id);
    return results?.item;
  }
}