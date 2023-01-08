import { Role } from "src/auth/role.enum";
import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity( {name: 'users' })
export class User {
    @ObjectIdColumn()
    id: ObjectID

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string;

    @Column()
    roles: Role[]
}