import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsService } from './services/schools.service'; 
import { SchoolsController } from './controllers/schools.controller';

@Module({
  imports: [],
  controllers: [AppController, SchoolsController],
  providers: [AppService, SchoolsService],
})
export class AppModule {}
