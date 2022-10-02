import { HttpModule } from '@nestjs/axios';
import { ConfigModule, } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { uuid4 } from '@sentry/utils';
import { EntityModel } from '@flagcar/types';
import { HttpClient } from '@flagcar/core/http/httpClient.service';
import { LoggingService } from "@flagcar/core/logging/logging.service";
import { MockHttpClient } from "@flagcar/fakes/mockHttpClient";
import { MockLoggingService } from "@flagcar/fakes/mockLoggingService";
import { Flag } from '../models/flag.model';
import { FlagService } from '../services/flag.service';
import { AddFlagCommand } from './addFlag.command';
import { AddFlagCommandHandler } from './addFlag.handler';

const initialiseDependencyInjection = async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [
        ConfigModule, 
        HttpModule],
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
  let httpClient: HttpClient;
  let sut: AddFlagCommandHandler

  beforeEach(async () => {
    const ref = await initialiseDependencyInjection();
    httpClient = ref.get<HttpClient>(HttpClient);
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