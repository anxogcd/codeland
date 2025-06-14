import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [
    IssuesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.get('POSTGRES_DB'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        debug: configService.get('POSTGRES_DEBUG'),
        driver: PostgreSqlDriver,
        autoLoadEntities: true,
        migrations: {
          path: './migrations',
          pattern: /^[\w-]+\.[tj]s$/,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
