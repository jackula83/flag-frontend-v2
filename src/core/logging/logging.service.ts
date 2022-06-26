import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class LoggingService {  
  abstract info(message: string): void
  abstract error(error: (Error | string)): void
}