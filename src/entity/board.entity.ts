import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Board {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ApiProperty({
        description: '작성자 아이디',
        example: 'user01',
    })
    @Column()
    userId: string;
    
    @ApiProperty({
        description: '제목',
        example: '제목',
    })
    @Column()
    title: string;
    
    @ApiProperty({
        description: '내용',
        example: '내용',
    })
    @Column()
    content: string;

    @ApiProperty({
        description: '수정 시간',
        example: '2024.01.01',
    })
    @UpdateDateColumn()
    updateAt: Date;

    @ApiProperty({
        description: '작성 시간',
        example: '2024.01.01',
    })
    @CreateDateColumn()
    createAt: Date;

    @ApiProperty({
        description: '유저 정보',
        example: '',
    })
    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;
}