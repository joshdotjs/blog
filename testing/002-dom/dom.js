const displayMessage = (text) => {

  const container = document.querySelector('#container');
  container.innerHTML = '';

  const message = document.createElement('p');
  message.classList.add('message');
  message.innerHTML = text;
  container.appendChild(message);
};

export { displayMessage }