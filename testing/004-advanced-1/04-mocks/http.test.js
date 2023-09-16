import { expect, vi } from 'vitest'; // not needed with --globals (expect helps intellisense)
import './console.js'

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// const mockAdd = jest.fn(add);  // create a spy wrapping the real function
// const mockAdd = vi.fn(add);  // create a spy wrapping the real function

import { http } from './http.js';
// const mockHttp = vi.mock(); 
// -with no config arg (2nd arg), it will mock all functions
//  by finding them in the module and replacing them with spies
// -with config arg (2nd arg), it will mock only the functions
//  specified in the config object
// -leave off the ./ to work with modules from node_modules

// Your test
test('[GET] http( URL )', async () => {
  const URL = 'http://localhost:9000/api/users';

  try {
    const data = await http({ url: URL, debug: false });
    // const str = `JOSH success:  ${data}`;
    // console.green(str);
    expect(data.length).toBeGreaterThan(0);
  } catch (error) {
    const str = `JOSH error:  ${error}`;
    console.red(str);
  }
});