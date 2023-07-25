// ==============================================

const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);


// ==============================================

const round = (x, places) =>  Number.parseFloat(x).toFixed(places);
const pad = (x, places) => String(x).padStart(places, '0');

// ==============================================

export { 
  qs, qsa,
  round, pad,
};