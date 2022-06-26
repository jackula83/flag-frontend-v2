import { Inject, Injectable } from "@nestjs/common";
import { EntityModel, Nullable } from '../../core/core.types';
import { ConfigService } from '@nestjs/config';
import { Flag } from './models/flag.model';
import { HttpClient } from "src/core/http/httpClient.service";

@Injectable()
export class FlagService {

  private url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) {
    const baseUrl = this.configService.get<string>('FLAGSERVICE_URL');
    const path = this.configService.get<string>('FLAGSERVICE_PATH_FLAG');
    this.url = `${baseUrl}/${path}`;
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