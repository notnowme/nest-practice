import { Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/entity/user.entity';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.getUserByUserName(username);

        if(user) {
            const matched = await compare(password, user.password);
    
            if(matched) {
               return user;
            } else {
                return null;
            }
        }

        return null;

    }

    async login(user: User) {
        const { username } = user;
        const payload = {
            id: user.id,
            username,
            name: user.name,
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
        }
    }
}
