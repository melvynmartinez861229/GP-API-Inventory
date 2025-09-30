import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './database/entities/user.entity';
import { OwnedPlayer } from './database/entities/owned-player.entity';
import { PlayerKit } from './database/entities/player-kit.entity';
import { GachaPlayer } from './database/entities/gacha-player.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ...(process.env.POSTGRES_SSL === 'true' ? { ssl: { rejectUnauthorized: false } } : {}),
  entities: [User, OwnedPlayer, PlayerKit, GachaPlayer],
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
});