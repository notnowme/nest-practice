import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUser() {
        const qb = this.userRepository.createQueryBuilder();
        qb.addSelect((subQuery) => {
            return subQuery.select('count(id)').from(Board, 'Board').where('Board.userId = User.id');
        }, 'User_boardCount');

        return qb.getMany();
    }

    async signUp(data: SignupUserDto) {
        const { username, name, password } = data;
        const encryptedPassword = await this.encryptPassword(password);

        const result = await this.userRepository.save({
            username,
            name,
            password: encryptedPassword,
        });
        const {password: pw, boardCount, ...userInfo} = result;
        return userInfo;
    }

    async login(data: LoginUserDto) {
        const {username, password} = data;

        const user = await this.userRepository.findOneBy({
            username,
        });

        if(!user) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        const matched = await compare(password, user.password);

        if(!matched) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const payload = {
            username,
            name: user.name,
        }

        const accessToken = jwt.sign(payload, 'secret_key');

        return {
            accessToken,
        }
    }

    async getUserByUserName(username: string) {
        const user = await this.userRepository.findOneBy({
            username,
        });
        return user;
    }

    async encryptPassword(password: string) {
        const DEFAULT_SALT = 12;
        return await hash(password, DEFAULT_SALT);
    }
}
