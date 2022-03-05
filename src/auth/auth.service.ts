import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import bcrypt from 'bcrypt';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../entities/Users";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: {email}
        });
        console.log(email, password, user);
        if (!user) {
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const { password, ...userWithoutPassword } = user; // user에서 password만 빼고 나머지가 userWithoutPassword 라는 의미란다.
            // delete user.password랑 같은 의미
            return userWithoutPassword;
        }
        return null;
    }
}