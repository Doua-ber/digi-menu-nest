import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRequestController } from './restaurant-request.controller';
import { RestaurantRequestService } from './restaurant-request.service';

describe('RestaurantRequestController', () => {
  let controller: RestaurantRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantRequestController],
      providers: [RestaurantRequestService],
    }).compile();

    controller = module.get<RestaurantRequestController>(RestaurantRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
