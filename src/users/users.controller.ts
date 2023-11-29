import { Body ,Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user.dto'
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import {  Serialize, SerializeInterceptor } from 'src/intercepter/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller("auth")
export class UsersController {
constructor(private usersService:UsersService) {}
    
@Post("signup") 
    createUser( @Body() body:  CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }


@Serialize(UserDto )
@Get('/:id')
findUser(@Param('id') id: string){
    const intId = parseInt(id)
    return this.usersService.findOne(intId)    
}

@Get()
findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);

}

@Delete('/:id')
removeUser(@Param('id') id: string){
    const intId = parseInt(id)
    return this.usersService.remove(intId)
}

@Patch('/:id')
updateUser(@Param('id') id: string,   @Body() body: UpdateUserDto){
    return this.usersService.update(parseInt(id), body)
}

}
