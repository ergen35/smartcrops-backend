import { Test, TestingModule } from '@nestjs/testing';
import { GasolineController } from './gasoline.controller';

describe('GasolineController', () => {
  let controller: GasolineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasolineController],
    }).compile();

    controller = module.get<GasolineController>(GasolineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
