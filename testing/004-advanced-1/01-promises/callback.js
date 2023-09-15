const callbackCaller = (callback) => {
  console.log('callbackCaller()');
  setTimeout(() => {
    callback(2);
  }, 1000);
};

export { callbackCaller }