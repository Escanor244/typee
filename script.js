// Sample sentences for typing
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How quickly daft jumping zebras vex.",
  "Sphinx of black quartz, judge my vow.",
  "Waltz, bad nymph, for quick jigs vex."
];

// DOM Elements
const textToTypeElement = document.getElementById('text-to-type');
const userInputElement = document.getElementById('user-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const resetButton = document.getElementById('reset-button');

let startTime, endTime, timerInterval;

// Initialize the test
function init() {
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  textToTypeElement.textContent = randomSentence;
  userInputElement.value = '';
  userInputElement.disabled = false;
  userInputElement.focus();
  timerElement.textContent = 0;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 100;
  startTime = null;
  endTime = null;
  clearInterval(timerInterval);
}

// Start the timer and track typing
userInputElement.addEventListener('input', () => {
  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }
  checkInput();
});

// Check user input against the target text
function checkInput() {
  const targetText = textToTypeElement.textContent;
  const userText = userInputElement.value;
  let accuracy = 0;

  if (userText.length > 0) {
    let correctChars = 0;
    for (let i = 0; i < userText.length; i++) {
      if (userText[i] === targetText[i]) {
        correctChars++;
      }
    }
    accuracy = Math.round((correctChars / userText.length) * 100);
  }

  accuracyElement.textContent = accuracy;

  if (userText === targetText) {
    endTest();
  }
}

// Update the timer
function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timerElement.textContent = elapsedTime;
  calculateWPM();
}

// Calculate WPM
function calculateWPM() {
  const targetText = textToTypeElement.textContent;
  const userText = userInputElement.value;
  const words = targetText.split(' ').length;
  const timeInMinutes = (new Date() - startTime) / 60000;
  const wpm = Math.round((userText.split(' ').length / timeInMinutes));
  wpmElement.textContent = wpm;
}

// End the test
function endTest() {
  clearInterval(timerInterval);
  userInputElement.disabled = true;
  calculateWPM();
}

// Reset the test
resetButton.addEventListener('click', init);

// Initialize on page load
init();