import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpException, HttpStatus, Inject, Logger, ParseIntPipe, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import UserCreateDTO from 'src/Models/DTOs/UserCreateDTO';
import { UsersService } from './user.service';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import User from 'src/Models/User';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/events/Events';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly eventEmitter: EventEmitter2) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body(ValidationPipe) data: UserCreateDTO) {
        try {
            const userId = await this.userService.createUser(data);

            await this.eventEmitter.emitAsync("user.created", new UserCreatedEvent(userId, new Date()))

            return "Resource Created";
        }
        catch (error) {
            throw new HttpException("Not Saved!", HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        }
    }

    @UseInterceptors(CacheInterceptor)
    @CacheKey("users")
    @Get("list")
    async listUsers(@Query('count', new DefaultValuePipe(20), ParseIntPipe) count: number) {

        try {
            return await this.userService.listUsers(count);
        }
        catch (error) {
            throw new HttpException("Cannot Get Users List", HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        }
        // let users = await this.cacheManager.get<User[]>('users');

        // if (users) {
        //     return users.length > count ? users.slice(0, count) : users;
        // }
        // else {
        //     try {
        //         users = await this.userService.listUsers(count);
        //         await this.cacheManager.set('users', users, 8000);

        //         return users;
        //     }
        //     catch (error) {
        //         throw new HttpException("Cannot Get Users List", HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        //     }
        // }
    }

}
