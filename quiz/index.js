const questions = [
  {
    question: "10GBASE-T is what IEEE standard?",
    options: [
      '802.3an-2006',
      '2',
      '3',
      '4',
    ],
  },
  {
    question: "When was 10GBASE-T released?",
    options: [
      '2006',
      '2',
      '3',
      '4',
    ],
  },
  {
    question: "10GBASE-T provides what bandwidth?  connections over unshielded or shielded twisted pair cables, over distances up to 100 metres (330 ft).[45]",
    options: [
      '10 Gbit/s',
      '2',
      '3',
      '4',
    ],
  },
  {
    question: "10GBASE-T can provide 10Gbit/s. over distances up to what length?",
    options: [
      '100 metres (330 ft)',
      '2',
      '3',
      '4',
    ],
  },
];

// ==============================================

// Fisher–Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(arr) {
  const cloned = structuredClone(arr);
  const correct = cloned[0];


  let currentIndex = cloned.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cloned[currentIndex], cloned[randomIndex]] = [
      cloned[randomIndex], cloned[currentIndex]];
  }

  const correct_index = cloned.findIndex((item) => item === correct);

  return { shuffled: cloned, correct_index }; 
  // Example:
  // const { shuffled } = shuffle(questions[0].options);
}

// ==============================================

function randomlyChooseElementExcludingIndices(arr, excludeIndices) {
  // Filter the array to exclude the elements at the given indices
  let filteredArray = arr.filter((_, index) => !excludeIndices.includes(index));

  // Return a random element from the filtered array
  const randomly_chosen_element = filteredArray[Math.floor(Math.random() * filteredArray.length)];

  // Return the index of the randomly chosen element
  const randomly_chosen_element_index = arr.findIndex((item) => item === randomly_chosen_element);

  return { element: randomly_chosen_element, randomly_chosen_element_index };
  // Example:
  // let myArray = [5, 3, 9, 1, 7];
  // let exclude = [0, 3]; // Exclude elements at indices 0 and 3
  // let { element } = randomlyChooseElementExcludingIndices(myArray, exclude);
}

// ==============================================

// State:
const already_asked_question_indices = [];

// ==============================================

// program flow:
// 0. generate quesion
//  -0.a: question is randomly selected
//  -0.b: add the index of the question to the already_asked_question_indices array
//  -0.c: options are shuffled
// 1. question and answers ares displayed
//  -1.a: question is displayed
//  -1.b: options are displayed

// 2. when user clicks option we check if it is correct
// 4. if correct we display correct message and increase score
// 5. we display next question
// 6. we repeat steps 1-6 until all questions are answered
// 7. we display final score


const DOM_quesion = document.querySelector('section#question');
const DOM_optioms = document.querySelectorAll('section#options  >  .option');
const DOM_score = document.querySelector('section#score  >  #score-value  >  span');
const DOM_num_remaining_quesions = document.querySelector('section#score  >  #num-remaining-quesions  >  span');
console.log('DOM_optioms', DOM_optioms);

let score = 0;

const runQuestion = () => {

  
  // 0.a quesion is randomly selected and options are shuffled
  const { element: question, randomly_chosen_element_index: randomly_chosen_question_index } = randomlyChooseElementExcludingIndices(questions, already_asked_question_indices);

  // 0.b: add the index of the question to the already_asked_question_indices array
  already_asked_question_indices.push(randomly_chosen_question_index);
  console.log('already_asked_question_indices: ', already_asked_question_indices);
  const num_remaining_quesions = questions.length - already_asked_question_indices.length;
  DOM_num_remaining_quesions.textContent = num_remaining_quesions;
  
  // 0.c: options are shuffled
  const { shuffled: shuffled_options, correct_index } = shuffle(question.options);
  console.log('shuffled_options', shuffled_options);

  //  -1.a: question is displayed
  DOM_quesion.textContent = question.question;

  //  -1.b: options are displayed
  DOM_optioms.forEach((DOM_option, idx) => {
    DOM_option.textContent = shuffled_options[idx];


    // 2. when user clicks option we check if it is correct
    DOM_option.onclick = () => {
      // 4. if correct we display correct message and increase score
      if (idx === correct_index) {
        DOM_option.classList.add('correct');
        score++;
      } else {
        // 5. if incorrect we display incorrect message and decrease score
        DOM_option.classList.add('incorrect');
      }

      // update score
      DOM_score.textContent = score;

      // 6. we repeat steps 1-5 until all questions are answered
      if (num_remaining_quesions > 0) {
        // 5. we display next question
        runQuestion();
      } else {
        // 7. we display final score
        alert(`Game over!  Score: ${score}`);
      }

    };
  });

  


};

runQuestion();