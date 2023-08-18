const questions = [
  {
    question: "10GBASE-T, or IEEE 802.3an-2006, is a standard released in 2006 to provide 10 Gbit/s connections over unshielded or shielded twisted pair cables, over distances up to 100 metres (330 ft).[45]",
    options: [
      'correct',
      '2',
      '3',
      '4',
    ],
  },
];

const shuffle = (arr) => { 
  
  const cloned = structuredClone(arr);
  const correct = cloned[0];

  for (let i = arr.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [cloned[i], cloned[j]] = [arr[j], arr[i]]; 
  } 

  const new_correct_index = cloned.findIndex((item) => item === correct);

  return { shuffled: cloned, new_correct_index }; 
};

const shuffled_options = shuffle(questions[0].options);
console.log('shuffled_options', shuffled_options);