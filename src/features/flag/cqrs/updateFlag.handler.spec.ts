import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { uuid4 } from "@sentry/utils";
import { EntityModel } from "@flagcar/types";
import { HttpClient } from "@flagcar/core/http/httpClient.service";
import { LoggingService } from "@flagcar/core/logging/logging.service";
import { MockHttpClient } from "@flagcar/fakes/mockHttpClient";
import { MockLoggingService } from "@flagcar/fakes/mockLoggingService";
import { Flag } from "../models/flag.model";
import { FlagService } from "../services/flag.service";
import { UpdateFlagCommandHandler } from "./updateFlag.handler";
import { UpdateFlagCommand } from "./updateFlag.command";

const initialiseDependencyInjection = async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [
        ConfigModule, 
        HttpModule],
      providers: [
        FlagService,
        UpdateFlagCommandHandler,
        {
          provide: LoggingService,
          useClass: MockLoggingService
        }, {
          provide: HttpClient,
          useClass: MockHttpClient
      }]
    }).compile();
}

const createFlagTemplate = (): Flag => {
  return {
    name: '',
    description: '',
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

const createFlagData = (command: UpdateFlagCommand): Flag => {
  const flagData = createFlagTemplate();
  flagData.id = command.id;
  flagData.description = command.description;
  flagData.defaultServeValue.state = command.defaultServeValue;
  flagData.isEnabled = command.isEnabled;
  return flagData;
}

describe('UpdateFlagCommandHandler (component)', () => { 
  let httpClient: HttpClient;
  let sut: UpdateFlagCommandHandler

  beforeEach(async () => {
    const ref = await initialiseDependencyInjection();
    httpClient = ref.get<HttpClient>(HttpClient);
    sut = ref.get<UpdateFlagCommandHandler>(UpdateFlagCommandHandler);
  });
  
  describe('updateFlag', () => { 
    it('should update the flag and return the updated flag', async () => {
      const command = new UpdateFlagCommand(1, 'a', true, true)
      const flagData = createFlagData(command);
      const httpResult: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(httpClient, 'post').mockImplementation(async _ => httpResult);
      jest.spyOn(httpClient, 'get').mockImplementation(async _ => httpResult);

      const result = await sut.execute(command);
      expect(result).toBe(httpResult.item);
    });

    it('should throw exception if flag doesnt exist', async () => {
      const command = new UpdateFlagCommand(1, 'a', true, true)
      const flagData = createFlagData(command);
      const httpResult: EntityModel<Flag> = {
        items: [flagData],
        item: flagData
      }
      jest.spyOn(httpClient, 'post').mockImplementation(async _ => httpResult);
      jest.spyOn(httpClient, 'get').mockImplementation(async _ => null);

      await expect(sut.execute(command))
      .rejects
      .toThrow(NotFoundException);
    });
  })
})