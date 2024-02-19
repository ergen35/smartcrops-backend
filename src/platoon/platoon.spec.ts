import { Test, TestingModule } from '@nestjs/testing';
import { Platoon } from './platoon';

describe('Platoon', () => {
  let provider: Platoon;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Platoon],
    }).compile();

    provider = module.get<Platoon>(Platoon);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
