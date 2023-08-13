import { test, it, expect } from 'vitest'; // not needed with --globals (not needed for Jest)
import { add } from './math';

// it() == test()

it('should pass', () => {

  const result = add(1, 2);
  const expected = 1 + 2;

  expect(result).toBe(expected);
});

// ==============================================

test('AAA', () => {
  // Arrange
  const a = 5
  const b = 10

  // Act
  const result = a + b

  // Assert
  if (result !== 15) {
    throw new Error('Addition function failed')
  }
})