import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('user')
@Unique(['username', 'email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    firstname: string

    @Column({ length: 50 })
    lastname: string

    @Column({ length: 50, unique: true })
    username: string

    @Column({ length: 100, unique: true })
    email: string

    @Exclude()
    @Column({ length: 255, select: false })
    hashed_password: string

    @Column({ default: false })
    is_verified: boolean

    @Column({ default: false })
    is_2fa_enabled: boolean

    @Column({ default: false })
    is_admin: boolean

    @CreateDateColumn({ type: 'datetime' })
    created_date: Date

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    updated_date: Date

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    last_connected: Date

}