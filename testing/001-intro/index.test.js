import { test, it, expect, describe } from 'vitest'; // not needed with --globals (not needed for Jest)
import { add } from './math';

// it() == test()

describe('test suite: add()', () => {

  // ==============================================

  // Test valid inputs

  it('should pass', () => {

    // Arrange:
    const numbers = [1, 2];

    // Act:
    const result = add(numbers);

    // Assert:
    const expected = 1 + 2;
    expect(result).toBe(expected);
  });

  // ==============================================

  // Test invalid input

  test('should yield NaN if at least one invalid number is provided', () => {

    // Arrange:
    const numbers = [1, null];

    // Act:
    const result = add(numbers);

    // Assert:
    expect(result).toBeNaN();
  });

  // ==============================================

  // Test invalid input

  it('input: []  =>  output: 0', () => {

    // Arrange:
    const numbers = [];

    // Act:
    const result = add(numbers);

    // Assert:
    const expected = 0;
    expect(result).toBe(expected);
  });

  // ==============================================

  // Test undefined input should throw error

  it(`
    should throw an error if no value is passed into the function
    input: undefined  =>  throw Error
  `, () => {

    // Arrange:
    // const numbers = undefined;

    // Act:
    // const result = add(numbers);
    // const result = add();
    const resultFn = () => {
      add();
    }

    // Assert:
    expect(resultFn).toThrow();
  });

  // ==============================================

  // Test valid input should NOT throw error

  it(`
    should NOT throw an error if valid inputs are passed into the function
    input: [0, 1]  =>  do NOT throw Error
  `, () => {

    // Arrange:
    const numbers = [0, 1];

    // Act:
    const resultFn = () => add(numbers);

    // Assert:
    expect(resultFn).not.toThrow();
  })

  // ==============================================

  // Test undefined input should throw error

  it(`
    should throw an error if non array values are passed into the function
    input: (0, 1)  =>  throw Error
  `, () => {

    // Arrange:
    const x1 = 0;
    const x2 = 1;

    // Act:
    const resultFn = () => {
      add(x1, x2);
    }

    // Assert:
    expect(resultFn).toThrow();
  });

  // ==============================================

  // Test specific error messages

  it(`
    should throw an error if non array values are passed into the function
    input: (0, 1)  =>  throw Error
  `, () => {

    // Arrange:
    const x1 = 0;
    const x2 = 1;

    // Act:
    const resultFn = () => {
      add(x1, x2);
    }

    // Assert:
    expect(resultFn).toThrow(/non-array value was passed/);
  });

  // ==============================================

  // Test returned type

  it(`
    should return a number if valid inputs passed in
    input: [0, 1]  =>  Number
  `, () => {

    // Arrange:
    const numbers = [0, 1];

    // Act:
    const result = add(numbers);

    // Assert:
    expect(result).not.toBeNaN();
    expect(result).toBeTypeOf('number');
  });

  // ==============================================

});