import { expect } from 'vitest'; // not needed with --globals (expect helps intellisense)
import { promiseFunc } from './promise.js';

describe('promise suite', () => {

  // ==============================================

  test('promises', () => {

    const promise1 = promiseFunc(2);
    expect(promise1).resolves.toBe('success');

    const promise2 = promiseFunc();
    expect(promise2).rejects.toBe('fail');

  });

  // ==============================================

  test('promises via async/await', async () => {

    try {    
      const promise1_await = await promiseFunc(2);
      expect(promise1_await).toBe('success');

      const promise2_await = await promiseFunc(); // rejected => error thrown...
      
    } catch (err) {
      console.log('catch (err) -- err: ', err)
      expect(err).not.toBe('success');
      expect(err).toBe('fail');
    }

  });

});