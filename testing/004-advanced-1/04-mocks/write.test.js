import { test, expect, vi } from 'vitest';
import { promises as fs } from 'fs';

import write from './write';

vi.mock('fs');
vi.mock('path', () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1]
      }
    }
  };
});

test('writeFile()', () => {
  const test_data = 'test';
  const test_file_name = 'test.txt';

  write(test_data, test_file_name)

  //return expect(write(test_data, test_file_name)).resolves.toBeUndefined();
  expect(fs.writeFile).toBeCalled();
  // expect(fs.writeFile).toBeCalledWith(test_file_name, test_data);
});
