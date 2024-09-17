import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardResponseDto } from './responsedto/create-board-res.dto';
import { BadRequestResponseDto } from './responsedto/bad-request-dto';
import { ApiBadRequestRes, ApiSuccessResCommon } from 'src/decorators/response.dto.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('Board')
export class BoardController {

    constructor(
        private readonly boardService: BoardService
    ){}

    private readonly logger = new Logger(BoardController.name);

    @Get()
    async findAll() {
        return await this.boardService.findAll();
    }


    @Get(':id')
    async find(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.boardService.find(id);
    }

    // Pipe로 데이터 검증이나 타입 변환을 할 수 있음
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiSuccessResCommon(CreateBoardResponseDto)
    @ApiBadRequestRes(BadRequestResponseDto)
    async create(
        @UserInfo() userInfo,
        @Body() data: {title: string, content: string}
    ) {
        if(!userInfo) throw new UnauthorizedException();

        return await this.boardService.create({
            userId: userInfo.id,
            title: data.title,
            content: data.content,
        });
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number,
        @Body('content') content: string, 
    ) {
        return await this.boardService.update(userInfo.id, id, {
            content,
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(
        @UserInfo() userInfo,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.boardService.delete(userInfo.id, id);
    }
}