import { HttpModule } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { uuid4 } from '@sentry/utils';
import { HttpClient } from '../../core/http/httpClient.service';
import { FlagService } from './flag.service';
import { EntityModel } from '../../core/core.types';
import { LoggingService } from '../../core/logging/logging.service';
import { Flag } from './models/flag.model';
import { MockLoggingService } from '../../fakes/mockLoggingService';
import { MockHttpClient } from '../../fakes/mockHttpClient';
import { FlagResolver } from './flag.resolvers';

const createMockFlagData = (): Flag[] => {
  return [{
        id: 1,
        uuid: uuid4(),
        name: 'flag-1',
        description: 'flag-description-1',
        alias: 'flag-alias-1',
        isEnabled: true,
        deleteFlag: false,
        createdAt: new Date(Date.now()),
        defaultServeValue: {state: true}
      }, {
        id: 2,
        uuid: uuid4(),
        name: 'flag-2',
        description: 'flag-description-2',
        alias: 'flag-alias-2',
        isEnabled: false,
        deleteFlag: false,
        createdAt: new Date(Date.now()),
        defaultServeValue: {state: true}
      }, {
        id: 3,
        uuid: uuid4(),
        name: 'flag-3',
        description: 'flag-description-3',
        alias: 'flag-alias-3',
        isEnabled: false,
        deleteFlag: false,
        createdAt: new Date(Date.now()),
        defaultServeValue: {state: false}
      }];
}

const initialiseDependencyInjection = async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [
        FlagResolver,
        FlagService, 
        {
          provide: LoggingService,
          useClass: MockLoggingService
        }, {
          provide: HttpClient,
          useClass: MockHttpClient
      }]
    }).compile();
}

describe('FlagResolver (component)', () => {
  let flagService: FlagService;
  let configService: ConfigService;
  let httpClient: HttpClient;
  let loggingService: LoggingService
  let sut: FlagResolver

  beforeEach(async () => {
    const ref = await initialiseDependencyInjection();

    flagService = ref.get<FlagService>(FlagService);
    configService = ref.get<ConfigService>(ConfigService);
    httpClient = ref.get<HttpClient>(HttpClient);
    loggingService = ref.get<LoggingService>(LoggingService);
    sut = ref.get<FlagResolver>(FlagResolver);
  });

  describe('flags', () => {
    it('should return an array of flags', async () => {
      const flagCollectionData = createMockFlagData();
      const result: EntityModel<Flag> = {
        items: flagCollectionData,
        item: flagCollectionData[0]
      };
      jest.spyOn(httpClient, 'enumerate').mockImplementation(async _ => result);

      expect(await sut.flags()).toBe(result.items);
    })
  })

  describe('flag', () => {
    const flagCollectionData = createMockFlagData();

    it.each(flagCollectionData)('returns flag', async ({id}) => {
      const flagData = flagCollectionData.find(x => x.id === id);
      const result: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(httpClient, 'get').mockImplementation(async _ => result);

      expect(await sut.flag(id)).toBe(result.item);
    });
  })
});
