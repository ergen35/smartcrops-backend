import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsController } from './controllers/schools.controller';
import { CatsService } from './cats/cats.service';
import { SchoolsService } from './schools/schools.service';
import { StfsModule } from './stfs/stfs.module';
import StudentsController from './controllers/students.controller';
import StudentsService from './students/students.service';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';

@Module({
  imports: [StfsModule],
  controllers: [AppController, SchoolsController, StudentsController],
  providers: [AppService, SchoolsService, StudentsService, CatsService],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestLoggerMiddleware)
    //         .forRoutes("/");

    consumer.apply(RequestLoggerMiddleware)
          .forRoutes({ method: RequestMethod.GET, path: "schools/*" })
  }
}
