// ==============================================

const error = new Error('error message...');
console.log(error);
console.log('===========================================');

// ==============================================

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
const custom_error = new CustomError('error message...', 404);
console.log(custom_error);
console.log('customer_error.status: ', custom_error.status);
console.log('===========================================');

// ==============================================

class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
}
const validation_error = new ValidationError('validation error message...');
console.log(validation_error);
console.log('===========================================');

// ==============================================

const f = (error) => {

  try {
    throw error;
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log('Handle validation errors...');
    } else if (e instanceof TypeError) {
      console.log('Handle type errors...');
    } else if (e instanceof CustomError) {
      console.log('Handle custom errors...');
    } else {
      console.log('Handle all other errors...');
    }
  }
};

// ==============================================

f(new ValidationError());
console.log('===========================================');
f(new CustomError());
console.log('===========================================');
f(new TypeError());
console.log('===========================================');
f(new Error());
console.log('===========================================');