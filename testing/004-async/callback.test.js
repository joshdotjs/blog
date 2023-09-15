
import { beforeEach, expect, it, vi } from 'vitest';

import { callbackCaller } from './callback';


// ==============================================

it ('should test the callback', (done) => {

  const callback = (x) => {
    const z = 2 * x;
    console.log(z);
    try {
      expect(z).toBe(4);
      done();
    } catch(err) {
      done(err)
    }
  };
  callbackCaller(callback);

});
