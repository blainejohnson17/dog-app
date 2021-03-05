import fetcher from './utils/fetcher';
import Services, { Route, RequestMethod } from './Services';

jest.mock('./utils/fetcher', () => ({
  request: jest.fn(() => Promise.resolve({
    data: {}
  }))
}));

describe('Services', () => {
  beforeAll(() => {
    Services.setBaseUrls({
      serviceBaseUrl: SERVICE_BASE_URL
    });
  });

  describe('request()', () => {
    beforeEach(() => {
      fetcher.request.mockReset();
    });
  });
});