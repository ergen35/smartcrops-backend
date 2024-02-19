import { Logger, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/Events';

@Module({
  imports: [CacheModule.register()],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserModule {


  @OnEvent("user.created")
  handleUserCreatedEvent(data: UserCreatedEvent) {
    Logger.log("User Created Event Handled", this.handleUserCreatedEvent.name)
  }
}
