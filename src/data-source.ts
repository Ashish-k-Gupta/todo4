import { DataSource } from "typeorm";
import { User } from "./entity/userEntity";
import { Task } from "./entity/taskEntity";


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'todo_user3',
    password: '123456789',
    database: 'todo_db3',
    synchronize: true,
    logging: ["error", "query", 'schema'],
    entities: [User, Task], 
    migrations: ["src/migrations/*.ts"]
})
