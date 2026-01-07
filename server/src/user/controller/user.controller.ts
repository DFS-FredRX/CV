import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../entity/createUser.dto';
import { UpdateUserDTO } from '../entity/updateUser.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Patch(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.update(id, updateUserDTO)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
    
}
