import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FlagModule } from './features/flag/flag.module';

@Module({
  imports: [
  GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
      // buildSchemaOptions: {
      //   dateScalarMode: 'timestamp'
      // },
      sortSchema: true,
      playground: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FlagModule
  ],
})
export class AppModule {}