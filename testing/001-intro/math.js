const add = (numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

export { add };