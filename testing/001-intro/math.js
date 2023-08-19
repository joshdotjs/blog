const add = (numbers) => {

  if (!Array.isArray(numbers)) throw new Error('a non-array value was passed into the function');
  
  let sum = 0;
  for (let i = 0; i < numbers.length; ++i) {
    const number = numbers[i];

    if (typeof number !== 'number') {
      sum = NaN;
      break;
    }
  
    sum += number;
  }

  return sum;
};

export { add };