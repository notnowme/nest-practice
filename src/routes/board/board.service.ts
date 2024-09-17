import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

    ) {}


    async findAll() {
        return this.boardRepository.find();
    }

    async find(id: number) {
        const board = await this.boardRepository.findOne({
            where: {
                id,
            },
            relations: {
                user: true,
            }
        });
        if(!board) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return board;
    }

    async create(data: CreateBoardDto) {
        const board = this.boardRepository.create(data); // dto만 만듦
        return await this.boardRepository.save(board); // 실제 db에 입력
    }

    async update(userId: string, id, data: UpdateBoardDto) {
        const board = await this.getBoardById(id);

        if (!board) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        if(userId !== board.userId) {
            throw new UnauthorizedException();
        }

        return this.boardRepository.update(id, {
            ...data,
        });
    }

    async delete(userId: string, id: number) {
        const board = await this.getBoardById(id);

        if (!board) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        if(userId !== board.userId) {
            throw new UnauthorizedException();
        }

        return await this.boardRepository.remove(board);
    }

    async getBoardById(id: number) {
        return this.boardRepository.findOneBy({id,});
    }

    async checkMyBoard() {

    }
}
