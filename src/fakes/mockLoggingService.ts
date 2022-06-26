import { LoggingService } from "../core/logging/logging.service";

export class MockLoggingService extends LoggingService {
  info(message: string): void {}
  error(error: (Error | string)): void {}
}