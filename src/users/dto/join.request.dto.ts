import {ApiProperty, PickType} from "@nestjs/swagger";
import {Users} from "../../entities/Users";

export class JoinRequestDto extends PickType
(Users,[
    'email',
    'nickname',
    'password'
] as const) {
    // extends PickType(Users,['email', 'nickname', 'password'] as const)를 하면 밑에 내용들이 필요없어진다

    // @ApiProperty({
    //     example: 'aipooh8882@naver.com',
    //     description: '이메일',
    //     required: true
    // })
    // public email: string;
    //
    // @ApiProperty({
    //     example: 'nestjs',
    //     description: '비밀번호',
    //     required: true
    // })
    // public password: string;
    //
    // @ApiProperty({
    //     example: 'taewoongjung',
    //     description: '닉네임',
    //     required: true
    // })
    // public nickname: string;
}