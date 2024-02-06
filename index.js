const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

//modal
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalCloseBtn = document.querySelector('.modal-close');

let correctWord;
let timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        showModal(`Time off! "${correctWord.toUpperCase()}" was the correct word`);
        initGame();
    }, 1000)
}

const initGame = () => {
    initTimer(60);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}

initGame();

// Function to show the modal popup
const showModal = (title) => {
    modalTitle.textContent = title;
    modal.classList.add('show');
};

// Function to hide the modal popup
const hideModal = () => {
    modal.classList.remove('show');
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return showModal("Please enter a word");
    if (userWord !== correctWord) return showModal(`Oops! "${userWord}" is not the correct word`);
    showModal(`Congrats! "${userWord.toUpperCase()}" is the correct word`);
    initGame();
}

modalCloseBtn.addEventListener('click', hideModal);

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
