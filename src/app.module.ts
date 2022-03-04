import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./middlewares/logger.middleware";
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import {UsersService} from "./users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChannelChats} from "./entities/ChannelChats";
import {ChannelMembers} from "./entities/ChannelMembers";
import {Channels} from "./entities/Channels";
import {DMs} from "./entities/DMs";
import {Mentions} from "./entities/Mentions";
import {Users} from "./entities/Users";
import {Workspaces} from "./entities/Workspaces";
import {Workspacemembers} from "./entities/Workspacemembers";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      UsersModule,
      WorkspacesModule,
      ChannelsModule,
      DmsModule,
      TypeOrmModule.forRoot({
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
        synchronize: true, // false로 해두어야 데이터 날려먹지 않는다
        logging: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
