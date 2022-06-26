import { Test } from '@nestjs/testing';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { uuid4 } from '@sentry/utils';
import { FlagService } from './flag.service';
import { LoggingService } from '../../core/logging/logging.service';
import { MockLoggingService } from '../../test/fakes/mockLoggingService';
import { MockHttpClient } from '../../test/fakes/mockHttpClient';
import { HttpClient } from '../../core/http/httpClient.service';
import { EntityModel } from '../../core/core.types';
import { Flag } from './models/flag.model';
import { HttpModule } from '@nestjs/axios';

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

describe('FlagService (unit)', () => {
  let flagService: FlagService;
  let configService: ConfigService;
  let httpClient: HttpClient;
  let loggingService: LoggingService

  beforeEach(async () => {
    const ref = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [FlagService, {
        provide: LoggingService,
        useClass: MockLoggingService
      }, {
        provide: HttpClient,
        useClass: MockHttpClient
      }]
    }).compile();

    flagService = ref.get<FlagService>(FlagService);
    configService = ref.get<ConfigService>(ConfigService);
    httpClient = ref.get<HttpClient>(HttpClient);
    loggingService = ref.get<LoggingService>(LoggingService);
  });

  describe('enumerate', () => {
    it('should return an array of flags', async () => {
      // arrange
      const flagCollectionData = createMockFlagData();
      const result: EntityModel<Flag> = {
        items: flagCollectionData,
        item: flagCollectionData[0]
      };
      jest.spyOn(configService, 'get').mockImplementation(_ => "a")
      jest.spyOn(httpClient, 'enumerate').mockImplementation(async _ => result);

      // assert
      expect(await flagService.enumerate()).toBe(result.items);
    })
  })

  describe('get', () => {
    const flagCollectionData = createMockFlagData();

    it.each(flagCollectionData)('returns flag', async ({id}) => {
      // arrange
      const flagData = flagCollectionData.find(x => x.id === id);
      const result: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(configService, 'get').mockImplementation(_ => "a")
      jest.spyOn(httpClient, 'get').mockImplementation(async _ => result);

      // assert
      expect(await flagService.get(id)).toBe(result.item);
    });
  })
});
