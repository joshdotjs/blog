import { test, it, expect } from 'vitest'; // not needed with --globals (not needed for Jest)
import { add, node_A, node__A } from './tree';


// ==============================================

test('AAA', () => {
  console.log('tree 1: ', node_A);
  console.log('tree 2: ', node__A);
})