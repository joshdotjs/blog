// ==============================================
// ==============================================
// ==============================================
// ==============================================

const pad   = (x, places) => String(x).padStart(places, '0');
const round = (x, places) => Number.parseFloat(x).toFixed(places);

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const setLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ==============================================

const getLS = (key) => JSON.parse(localStorage.getItem(key));

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const fireEvent = (name, data) => {

  // Create a new custom event
  const event = new CustomEvent(name, { detail: { data } });
  
  // Dispatch the event on a DOM element
  document.dispatchEvent(event);
};

// ==============================================

const listeForEvent = (name, fn) => {
  document.addEventListener(name, fn);
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// const qs  = x => document.querySelector(x);
// const qsa = x => document.querySelectorAll(x);

const qs = (str, root=document) => {
  const elem = root.querySelector(str);
  if (!elem) {
    const message = `qs( ${str} ) not found`;
    throw new Error(message);
  }
  return elem;
};

// ==============================================

const qsa = (str, root=document) => {
  const elems = root.querySelectorAll(str);
  if (elems.length === 0) {
    const message = `qsa( ${str} ) not found`;
    throw new Error(message);
  }
  return elems;
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export { 
  qs, qsa,
  round, pad,
  setLS, getLS,
  fireEvent, listeForEvent,
};