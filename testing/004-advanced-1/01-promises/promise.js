const promiseFunc = (x) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {      
      if (x) {
        resolve('success');
      } else {
        reject(new Error('fail'));
      } // if (x)
    }, 1e3); // setTimeout()
  }); // new Promise()
  return promise;
};

export { promiseFunc }