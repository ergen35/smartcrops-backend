import { Test, TestingModule } from '@nestjs/testing';
import { StfsService } from './stfs.service';

describe('StfsService', () => {
  let service: StfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StfsService],
    }).compile();

    service = module.get<StfsService>(StfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
