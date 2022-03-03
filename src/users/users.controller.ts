import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {JoinRequestDto} from "./dto/join.request.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserDto} from "../common/dto/user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiResponse({
        type: UserDto
    })
    @Get()
    getUsers(@Req() req) { // login 되어있는 사용자의 정보를 가져온다
        return req.user;
    }

    @ApiOperation({ summary: '회원가입' })
    @Post()
    postUsers(@Body() data: JoinRequestDto) {
        this.usersService.postUsers(data.email, data.nickname, data.password);
        return;
    }

    @ApiResponse({
        type: UserDto,
        status: 200,
        description: '성공'
    })
    @ApiResponse({
        status: 500,
        description: '서버 에러'
    })
    @ApiOperation({ summary: '로그인' })
    @Post('login')
    login(@Req() req) {
        return req.user;
    }

    @ApiOperation({ summary: '로그아웃' })
    @Post('logout')
    logOut(@Req() req, @Req() res) {
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
