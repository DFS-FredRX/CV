import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/createUser.dto';
import * as argon2 from 'argon2'
import { UpdateUserDTO } from '../dto/updateUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const { password, email, username, ...rest } = createUserDTO;
        const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] })
        if (existingUser) throw new ConflictException("Cet email ou d'utilisateur est déjà utilisé")
        const hashedPassword = await argon2.hash(password)
        const newUser = this.userRepository.create({ ...rest, email, username, hashed_password: hashedPassword })
        return await this.userRepository.save(newUser)
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'existe pas`)
        return user
    }

    async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
        const user = await this.findOne(id)
        if (updateUserDTO.password) updateUserDTO.password = await argon2.hash(updateUserDTO.password)
        const { password, ...rest } = updateUserDTO
        const updatedUser = this.userRepository.merge(user, { ...rest, ...(password ? { hashed_password: password } : {}) })
        return await this.userRepository.save(updatedUser)
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id)
        await this.userRepository.remove(user)
    }

    async findByCredentials(identifier: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: [{ email: identifier }, { username: identifier }], select: ['id', 'email', 'username', 'hashed_password', 'is_admin'] })
    }

}