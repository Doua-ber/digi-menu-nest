import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRequestService } from './restaurant-request.service';

describe('RestaurantRequestService', () => {
  let service: RestaurantRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantRequestService],
    }).compile();

    service = module.get<RestaurantRequestService>(RestaurantRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
