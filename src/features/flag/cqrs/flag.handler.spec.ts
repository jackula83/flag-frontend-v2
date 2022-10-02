import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { uuid4 } from '@sentry/utils';
import { HttpClient } from '../../../core/http/httpClient.service';
import { EntityModel } from "../../../core/core.types";
import { LoggingService } from "../../../core/logging/logging.service";
import { MockHttpClient } from "../../../fakes/mockHttpClient";
import { MockLoggingService } from "../../../fakes/mockLoggingService";
import { Flag } from "../models/flag.model";
import { FlagService } from "../services/flag.service";
import { FlagQueryHandler } from "./flag.handler";
import { FlagQuery } from "./flag.query";
import { nameof } from "ts-simple-nameof";

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
        FlagService, 
        FlagQueryHandler,
        {
          provide: LoggingService,
          useClass: MockLoggingService
        }, {
          provide: HttpClient,
          useClass: MockHttpClient
      }]
    }).compile();
}

describe('FlagQueryHandler (component)', () => {
  let httpClient: HttpClient;
  let sut: FlagQueryHandler

  beforeEach(async () => {
    const ref = await initialiseDependencyInjection();
    httpClient = ref.get<HttpClient>(HttpClient);
    sut = ref.get<FlagQueryHandler>(FlagQueryHandler);
  });

  describe('enumerate', () => {
    it('should return an array of flags', async () => {
      const query = new FlagQuery();
      const flagCollectionData = createMockFlagData();
      const result: EntityModel<Flag> = {
        items: flagCollectionData,
        item: flagCollectionData[0]
      };
      jest.spyOn(httpClient, 'enumerate').mockImplementation(async _ => result);

      expect(await sut.execute(query)).toBe(result.items);
    })
  })

  describe('get', () => {
    const flagCollectionData = createMockFlagData();

    it.each(flagCollectionData)('returns flag', async ({id}) => {
      const query = new FlagQuery(id);
      const flagData = flagCollectionData.find(x => x.id === id);
      const result: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(httpClient, 'get').mockImplementation(async _ => result);

      expect(await sut.execute(query)).toBe(result.item);
    });
  })
});