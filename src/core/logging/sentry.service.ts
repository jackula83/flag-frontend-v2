import * as Sentry from '@sentry/node';
import { Injectable } from "@nestjs/common";
import { ConsoleStyle } from '../console/consoleStyles';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './logging.service';

@Injectable()
export class SentryService implements LoggingService {
  constructor(private configService: ConfigService) {
    Sentry.init({
      dsn: `https://7fc7fabfc588442bb79f87503976795b@o408624.ingest.sentry.io/6387150`,
      tracesSampleRate: 1.0,
    })
  }

  error(error: string | Error): void {
    const exception = error instanceof Error
      ? error
      : new Error(error);    
    const [subject, body] = this.getInfoLog(exception.message);
    this.logToConsole(subject, body);
    Sentry.captureException(exception);
  }

  info(message: string): void {    
    const [subject, body] = this.getInfoLog(message);
    this.logToConsole(subject, body);
    Sentry.captureMessage(message);
  }

  private getInfoLog = (message: string): [string, string] => [
      `SentryLog(${global.nameof(this.info)})`,
     `${ConsoleStyle.FgYellow}${message}${ConsoleStyle.Reset}`
    ];

  private getErrorLog = (message: string): [string, string] => [
    `SentryLog(${global.nameof(this.error)})`,
    `${ConsoleStyle.FgRed}${message}${ConsoleStyle.Reset}`
  ]

  private logToConsole = (subject: string, body: string) => {
    console.error(`${subject}: ${body}`);
  }

}