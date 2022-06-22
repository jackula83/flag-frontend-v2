import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FlagModule } from './features/flag/flag.module';

@Module({
  imports: [
    FlagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({isGlobal: true})
  ],
})
export class AppModule {}