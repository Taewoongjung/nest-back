import {Body, Controller, Get, Post, Req, UseInterceptors} from '@nestjs/common';
import {JoinRequestDto} from "./dto/join.request.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserDto} from "../common/dto/user.dto";
import {User} from "../common/decorator/user.decorator";
import {UndefinedToNullInterceptor} from "../common/interceptors/undefinedToNull.interceptor";

@UseInterceptors(UndefinedToNullInterceptor) // 앞으로 해당 컨트롤러에서 리턴하는 값은 undefined가 null로 바뀌어서 리턴된다. (개별적으로 적용 가능)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiResponse({
        type: UserDto
    })
    @ApiOperation({ summary: '내 정보 조회' })
    @Get()
    getUsers(@User() user) { // login 되어있는 사용자의 정보를 가져온다
        return user; // req.user
    }
    /*
        위 코드는 데코레이터를 추가한 후의 코드이고
        @Get()
        getUsers(@Req() req) {
            return req.user
        }
        이 코드는 데코레이터를 추가 전의 코드이기에 위 코드와 같은 의미이다
    */

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
    login(@User() user) {
        return user;
    }
    // interceptor는 응답 할 때 데이터를 보내는 형식을 보내기 전에 한번 더 알아서
    // interceptor가 바꿔줄 수 있다.

    @ApiOperation({ summary: '로그아웃' })
    @Post('logout')
    logOut(@Req() req, @Req() res) {
        req.logOut();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
