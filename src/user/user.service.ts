import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import UserCreateDTO from 'src/Models/DTOs/UserCreateDTO';
import User from 'src/Models/User';
import { DataSource } from 'typeorm';


@Injectable()
export class UsersService {

    constructor(@InjectDataSource('default') private readonly dataSource: DataSource) { }

    async createUser(data: UserCreateDTO) {
        let user = new User();

        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.birthDate = data.birthDate;

        const usersRepo = this.dataSource.getRepository(User);
        user = await usersRepo.save(user);

        return user.id;
    }

    async listUsers(count: number) {
        const usersRepo = this.dataSource.getRepository(User);
        return await usersRepo.find({ take: count });
    }
}
