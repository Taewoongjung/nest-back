import {ApiProperty} from "@nestjs/swagger";

export class JoinRequestDto {
    @ApiProperty({
        example: 'aipooh8882@naver.com',
        description: '이메일',
        required: true
    })
    public email: string;

    @ApiProperty({
        example: 'nestjs',
        description: '비밀번호',
        required: true
    })
    public password: string;

    @ApiProperty({
        example: 'taewoongjung',
        description: '닉네임',
        required: true
    })
    public nickname: string;
}