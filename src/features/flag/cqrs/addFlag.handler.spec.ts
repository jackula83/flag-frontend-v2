import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityModel } from 'src/core/core.types';
import { HttpClient } from '../../../core/http/httpClient.service';
import { LoggingService } from "../../../core/logging/logging.service";
import { MockHttpClient } from "../../../fakes/mockHttpClient";
import { MockLoggingService } from "../../../fakes/mockLoggingService";
import { Flag } from '../models/flag.model';
import { FlagService } from '../services/flag.service';
import { AddFlagCommand } from './addFlag.command';
import { AddFlagCommandHandler } from './addFlag.handler';
import { uuid4 } from '@sentry/utils';

const initialiseDependencyInjection = async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [
        FlagService,
        AddFlagCommandHandler,
        {
          provide: LoggingService,
          useClass: MockLoggingService
        }, {
          provide: HttpClient,
          useClass: MockHttpClient
      }]
    }).compile();
}

const createFlagData = (name: string, description: string): Flag => {
  return {
    name,
    description,
    alias: '',
    isEnabled: false,
    defaultServeValue: {
      state: false
    },
    id: 1,
    uuid: uuid4(),
    createdAt: new Date(),
    deleteFlag: false
  };
}

describe('AddFlagCommandHandler (component)', () => { 
  let flagService: FlagService;
  let configService: ConfigService;
  let httpClient: HttpClient;
  let loggingService: LoggingService
  let sut: AddFlagCommandHandler

  beforeEach(async () => {
    const ref = await initialiseDependencyInjection();

    flagService = ref.get<FlagService>(FlagService);
    configService = ref.get<ConfigService>(ConfigService);
    httpClient = ref.get<HttpClient>(HttpClient);
    loggingService = ref.get<LoggingService>(LoggingService);
    sut = ref.get<AddFlagCommandHandler>(AddFlagCommandHandler);
  });
  
  describe('addFlag', () => { 
    it('should add a flag and return the added flag', async () => {
      const command = new AddFlagCommand('a', 'b');
      const flagData = createFlagData(command.name, command.description);
      const httpResult: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(httpClient, 'post').mockImplementation(async _ => httpResult);

      const result = await sut.execute(command);
      expect(result).toBe(httpResult.item);
    })
  })
})