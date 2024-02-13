import { Body, Controller, ForbiddenException, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseIntPipe } from '@nestjs/common';
import { StfsService } from './stfs/stfs.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly stfsService: StfsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('something/:gat')
  getSomething(@Query('id') id: string, @Param('gat') gat: string)
  {
    return [id, gat, this.stfsService.getStfs(gat)];
  }

  @Get('throw-up')
  throwSomeError(){
    throw { message: "Not found", statusCode: 404 }
  }
}
