import { Logger, Module } from '@nestjs/common';
import { StfsService } from './stfs.service';
import { StfsController } from './stfs.controller';

@Module({
  providers: [StfsService],
  controllers: [StfsController],
  exports: [StfsService]
})
export class StfsModule {}
