const notification = ({ message }) => {

  const rect = document.querySelector('main').getBoundingClientRect();
  const { top, right, bottom, left } = rect;

  const elem = document.createElement('div');
  elem.style.position = 'absolute';
  // elem.style.bottom = '32px';
  elem.style.left = '32px';
  // elem.style.width = '100vw';
  elem.style.zIndex = '100';
  elem.style.backgroundColor = 'white';
  elem.style.color = 'black';
  elem.style.borderRadius = '5px';
  elem.style.padding = '1rem';
  // elem.style.boxShadow = '0 0 1rem black';
  elem.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
  // elem.textContent = `uploaded file: ${file.name}`;
  elem.textContent = message;
  
  // elem.style.top = `calc(${bottom}px - ${elem.getBoundingClientRect().height}px)`;
  elem.style.top = `calc(${bottom}px - 54px - 32px)`;
  document.body.appendChild(elem);

  console.log('elem height: ', elem.getBoundingClientRect().height);
  console.log('elem height: ', `${elem.getBoundingClientRect().height}px`);

  const options = {
    duration: 750,
    easing: 'ease-in-out',
    fill: 'forwards',
  };

  elem.style.transform = 'translateX(-100%)';
  elem.animate([
      { transform: 'translateX(-100%)', opacity: 0 },
      { transform: 'translateX(0%)', opacity: 1 }
    ], 
    options
  );

  setTimeout(() => {
    elem.animate([
        { transform: 'translateX(0%)', opacity: 1 },
        { transform: 'translateX(-100%)', opacity: 0 }
      ], 
      options
    );
    setTimeout(() => document.body.removeChild(elem), options.duration);
  }, 3e3);

};

export { notification };