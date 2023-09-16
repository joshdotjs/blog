import { expect, vi } from 'vitest'; // not needed with --globals (expect helps intellisense)
import { add } from './add.js';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// const mockAdd = jest.fn(add);  // create a spy wrapping the real function
//  const mockAdd = vi.fn(add);  // create a spy wrapping the real function
 const mockAdd = vi.fn(() => {}); // the function passed in defines the behavior of the function we'll test


// Your test
test('adds 1 + 2 to equal 3', () => {
  mockAdd(1, 2);

  // Check how many times the function was called
  expect(mockAdd).toHaveBeenCalledTimes(1);

  // Check what arguments the function was called with
  expect(mockAdd).toHaveBeenCalledWith(1, 2);

  // Check the return value
  expect(mockAdd).toHaveReturnedWith(3);
});