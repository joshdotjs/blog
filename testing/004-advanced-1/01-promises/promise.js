const promiseFunc = (x) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {      
      if (x) {
        resolve('success');
      } else {
        reject('fail');
      } // if (x)
    }, 1e3); // setTimeout()
  }); // new Promise()
  return promise;
};

export { promiseFunc }