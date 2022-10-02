import { Injectable } from "@nestjs/common";
import { Nullable } from '../../../core/core.types';
import { ConfigService } from '@nestjs/config';
import { Flag } from '../models/flag.model';
import { HttpClient } from "../../../core/http/httpClient.service";
import { FlagToggleRequest, FlagToggleResponse } from "../flag.types";
import { FxEntityService } from "../../../core/fx/fxentity.service";

@Injectable()
export class FlagService extends FxEntityService<Flag> {

  private flagUrl: string;
  protected entityUrl: string;

  constructor(
    private readonly configService: ConfigService,
    protected readonly httpClient: HttpClient
  ) {
    super(httpClient);
    const flagServiceUrl = process.env.FlagService__Url 
      ?? this.configService.get<string>('FLAGSERVICE_URL');
    const flagServicePort = process.env.FlagService__Port
      ?? this.configService.get<string>('FLAGSERVICE_PORT');
    const baseUrl = `http://${flagServiceUrl}:${flagServicePort}/api`;
    this.entityUrl = `${baseUrl}/flagEntity`;
    this.flagUrl = `${baseUrl}/flag`;
  }

  public async toggle(id: number): Promise<Nullable<Flag>> {
    const payload: FlagToggleRequest = {
      flagId: id
    }
    const results = await this.httpClient.post<FlagToggleResponse>(
      `${this.flagUrl}/toggle`,
      payload
    );
    return results?.flag;
  }
}