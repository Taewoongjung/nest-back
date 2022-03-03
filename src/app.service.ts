import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UsersService} from "./users/users.service";

@Injectable()
export class AppService {
  // constructor(private readonly configService: ConfigService) {}
  //
  // getHello() {
  //   return this.configService.get('SECRET')// return process.env.SECRET;
  // }

  constructor(private readonly configService: ConfigService ,private usersService: UsersService) {}

  async getHello() {
    this.usersService.getUser();
    this.usersService.postUsers('a','a','a');
    return this.configService.get('SECRET');
  }
}
