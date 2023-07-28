// ==============================================
// ==============================================
// ==============================================
// ==============================================

const qs  = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

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

export { 
  qs, qsa,
  round, pad,
  setLS,
  fireEvent, listeForEvent,
};