import { CounterMiddleware } from './counter.middleware';

describe('CounterMiddleware', () => {
  it('should be defined', () => {
    expect(new CounterMiddleware()).toBeDefined();
  });
});
