import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entities/ChannelChats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Channels } from './src/entities/Channels';
import { DMs } from './src/entities/DMs';
import { Mentions } from './src/entities/Mentions';
import { Users } from './src/entities/Users';
import { Workspacemembers } from './src/entities/Workspacemembers';
import { Workspaces } from './src/entities/Workspaces';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    Workspacemembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
  keepConnectionAlive: true, // 코드가 바뀌고 hot reloading이 실행될 때 DB가 끊기지 않도록 해주는거다.
};

export = config;
