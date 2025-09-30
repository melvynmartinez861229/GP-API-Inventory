import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OwnedPlayer } from './entities/owned-player.entity';
import { PlayerKit } from './entities/player-kit.entity';
import { GachaPlayer } from './entities/gacha-player.entity';
import { User } from './entities/user.entity';

const entities = [
  User,
  OwnedPlayer,
  PlayerKit,
  GachaPlayer,
];

const toBoolean = (value?: string, defaultValue = false): boolean => {
  if (value === undefined) return defaultValue;
  return ['true', '1', 'yes'].includes(value.toLowerCase());
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        const synchronize = toBoolean(
          configService.get<string>('POSTGRES_SYNCHRONIZE'),
          !isProduction,
        );

        const baseConfig: Partial<TypeOrmModuleOptions> = {
          entities,
          synchronize,
          logging: configService.get<string>('NODE_ENV') === 'development',
          autoLoadEntities: true,
        };

        const sslEnabled = toBoolean(configService.get<string>('POSTGRES_SSL'), isProduction);
        const rejectUnauthorized = toBoolean(
          configService.get<string>('POSTGRES_SSL_REJECT_UNAUTHORIZED'),
          false,
        );

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: sslEnabled ? { rejectUnauthorized } : false,
            ...baseConfig,
          } as TypeOrmModuleOptions;
        }

        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST', 'localhost'),
          port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10),
          username: configService.get<string>('POSTGRES_USER', 'goalplay'),
          password: configService.get<string>('POSTGRES_PASSWORD', 'password'),
          database: configService.get<string>('POSTGRES_DB', 'goalplay'),
          ssl: sslEnabled ? { rejectUnauthorized } : false,
          ...baseConfig,
        } as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}