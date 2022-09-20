import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { HttpClient } from "../../core/http/httpClient.service";

@Injectable()
export class LogService {
  
  private readonly isEnabled: boolean;

  constructor(
    private readonly configService: ConfigService
  ) {
    const logServiceEnabled = process.env.LogService__Enabled === 'true'
      || this.configService.get<boolean>('LOGSERVICE_ENABLED');
    if (!logServiceEnabled) return;

    // currently not implemented (always false)
  }

  public IsEnabled(): boolean {
    return this.isEnabled;
  }
}