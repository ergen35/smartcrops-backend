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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './configuration/DatabaseConfig';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { UsersService } from './user/user.service';
import User from './Models/User';

@Module({
  imports: [
    StfsModule,
    ConfigModule.forRoot({ envFilePath: ['.env'], load: [databaseConfig] }),
    TypeOrmModule.forRoot(
      {
        name: 'default',
        type: 'postgres',
        host: databaseConfig().database.host,
        port: databaseConfig().database.port,
        username: databaseConfig().database.username,
        password: databaseConfig().database.password,
        database: databaseConfig().database.name,
        entities: [ User ],
        autoLoadEntities: false, // when the app gets bigger
        logging: true,
        logger: 'advanced-console',
        synchronize: true,
      }
    ),
    UserModule,    
  ],
  controllers: [
    AppController,
    SchoolsController,
    StudentsController
  ],
  providers: [
    AppService,
    SchoolsService,
    StudentsService,
    CatsService,
    UsersService
  ],
  exports: [

  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware)
      .forRoutes("/*")
  }
}
