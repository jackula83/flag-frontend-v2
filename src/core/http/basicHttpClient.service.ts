import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { LogService, HttpClient as HttpClient, Nullable } from "../core.types";

@Injectable()
export class BasicHttpClient implements HttpClient {
  constructor(
    private readonly httpService: HttpService,
    @Inject(nameof<LogService>()) private logService: LogService
  ) {}

  async get<TResponse>(url: string, id: number): Promise<Nullable<TResponse>> {
    const obs = this.httpService.get<TResponse>(`${url}/${id}`);
    return firstValueFrom(obs)
      .then(res => {
        this.handleAnyErrors(res);
        return res.data
      });
  }
  
  async enumerate<TResponse>(url: string): Promise<TResponse> {
    const obs = this.httpService.get<TResponse>(`${url}`);
    return lastValueFrom(obs)
      .then(res => {
        this.handleAnyErrors(res);
        return res.data;
      });
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