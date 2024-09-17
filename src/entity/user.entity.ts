import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({
        description: '유저 아이디',
        example: 'user01',
    })
    @Column({unique: true})
    username: string;

    @ApiProperty({
        description: '비밀번호',
        example: '****',
    })
    @Column()
    @Exclude()
    password: string;


    @ApiProperty({
        description: '유저 이름',
        example: '유저 01',
    })
    @Column()
    name: string;

    @ApiProperty({
        description: '게시글 정보',
        example: [],
    })
    @OneToMany(() => Board, (board) => board.user)
    boards: Board[]

    // 버추얼 컬럼
    @Column({select: false, nullable: true, insert: false, update: false,})
    boardCount?: number;
}