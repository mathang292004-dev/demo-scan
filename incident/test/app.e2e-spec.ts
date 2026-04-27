import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from '../src/services/common-service';

describe('CommonService (e2e)', () => {
  let service: CommonService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();

    service = moduleFixture.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create success message', () => {
    const result = service.successMessage({ test: 'data' }, 'Success', 200, true);
    expect(result).toEqual({
      data: { test: 'data' },
      message: 'Success',
      statusCode: 200,
      status: true,
    });
  });

  it('should create error message', () => {
    const error = new Error('Test error');
    const logger = { error: jest.fn() };
    const result = service.errorMessage('Error occurred', 500, logger, error);
    
    expect(result.message).toBe('Error occurred');
    expect(result.statusCode).toBe(500);
    expect(result.error).toBeDefined();
  });
});
