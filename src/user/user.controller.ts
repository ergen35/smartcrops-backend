import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpException, HttpStatus, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import UserCreateDTO from 'src/Models/DTOs/UserCreateDTO';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body(ValidationPipe) data: UserCreateDTO) {
        try {
            await this.userService.createUser(data);
            return "Resource Created";
        }
        catch (error) {
            throw new HttpException("Not Saved!", HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        }
    }

    @Get("list")
    async listUsers(@Query('count', new DefaultValuePipe(20), ParseIntPipe) count: number) {

        try {
            return await this.userService.listUsers(count);
        }
        catch (error) {
            throw new HttpException("Cannot Get Users List", HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        }
    }
}
