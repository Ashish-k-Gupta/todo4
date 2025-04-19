import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, OneToMany, Index } from 'typeorm';
import { Task } from './taskEntity';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')  
  id!: string;

  @Column({
  type: 'varchar',  
  unique: true,
  transformer:{
    to: (value: string) => value.toLowerCase(),
    from: (value: string) => value
  }

  })
  @Index()
  @IsEmail()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;


  @CreateDateColumn({default: Timestamp})
  createdAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[]
 
}
