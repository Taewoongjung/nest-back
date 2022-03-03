import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {JoinRequestDto} from "./dto/join.request.dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(@Req() req) { // login 되어있는 사용자의 정보를 가져온다
        return req.user;
    }

    @Post()
    postUsers(@Body() data: JoinRequestDto) {
        this.usersService.postUsers(data.email, data.nickname, data.password);
        return;
    }

    @Post('login')
    login(@Req() req) {
        return req.user;
    }

    @Post('logout')
    logOut(@Req() req, @Req() res) {
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}