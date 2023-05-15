import { Test, TestingModule } from '@nestjs/testing';
import { Kr36NoController } from './kr36--no.controller';

describe('Kr36NoController', () => {
  let controller: Kr36NoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Kr36NoController],
    }).compile();

    controller = module.get<Kr36NoController>(Kr36NoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
