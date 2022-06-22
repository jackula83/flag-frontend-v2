import * as _ from 'ts-nameof';
import * as Sentry from '@sentry/node';
import { Injectable } from "@nestjs/common";
import { LogService } from './../core.types';
import { ConsoleStyle } from '../console/consoleStyles';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SentryService implements LogService {
  constructor(private configService: ConfigService) {
    Sentry.init({
      dsn: `https://${configService.get<string>('SENTRY_DSN')}.ingest.sentry.io/6387150`,
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
      `SentryLog(${nameof(this.info)})`,
     `${ConsoleStyle.FgYellow}${message}${ConsoleStyle.Reset}`
    ];

  private getErrorLog = (message: string): [string, string] => [
    `SentryLog(${nameof(this.error)})`,
    `${ConsoleStyle.FgRed}${message}${ConsoleStyle.Reset}`
  ]

  private logToConsole = (subject: string, body: string) => {
    console.error(`${subject}: ${body}`);
  }

}