// ==============================================

const qs  = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// ==============================================

const pad   = (x, places) => String(x).padStart(places, '0');
const round = (x, places) =>  Number.parseFloat(x).toFixed(places);

// ==============================================

export { 
  qs, qsa,
  round, pad,
};