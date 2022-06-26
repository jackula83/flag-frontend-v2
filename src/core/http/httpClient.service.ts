import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
import { Nullable } from '../core.types';

@Injectable()
export abstract class HttpClient {
  constructor(
    private readonly httpService: HttpService,
    private logService: LoggingService
  ) {}

  async get<TResponse>(url: string, id: number): Promise<Nullable<TResponse>> {
    const obs = this.httpService.get<TResponse>(`${url}/${id}`);
    const res = await firstValueFrom(obs);
    this.handleAnyErrors(res);
    return res?.data;
  }
  
  async enumerate<TResponse>(url: string): Promise<TResponse> {
    const obs = this.httpService.get<TResponse>(`${url}`);
    const res = await firstValueFrom(obs);
    this.handleAnyErrors(res);
    return res?.data;
  }

  private handleAnyErrors = (response: AxiosResponse): void => {
    if (this.isExpectedError(response.status))
      this.logAndThrowError(response.statusText);
  }

  private isExpectedError = (httpStatus: number): boolean => 
    httpStatus >= 400 && httpStatus < 500;

  private logAndThrowError = (statusText: string): void => {
    this.logService.error(statusText);
    throw new Error(statusText);
  }

}