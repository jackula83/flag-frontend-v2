import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FlagModule } from './features/flag/flag.module';
import { LogModule } from './features/log/log.module';

const GraphQLModules = [
  FlagModule,
  LogModule
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      sortSchema: true,
      playground: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ...GraphQLModules
  ],
})
export class AppModule {}