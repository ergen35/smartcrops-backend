import { Test, TestingModule } from '@nestjs/testing';
import { StfsController } from './stfs.controller';

describe('StfsController', () => {
  let controller: StfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StfsController],
    }).compile();

    controller = module.get<StfsController>(StfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
