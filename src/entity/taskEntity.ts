import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "./userEntity";

@Entity()
export class Task{

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()    
    title!: string;

    @Column({default: false})
    isDone!: boolean

    @Column()
    description!: string;

    @CreateDateColumn({default: Timestamp})
    createdAt!: Date;

    @UpdateDateColumn({default: Timestamp})
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    user!: User
}