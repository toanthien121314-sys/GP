const paragraphs = [
    "Hành trình vạn dặm bắt đầu từ một bước chân đầu tiên.",
    "Luyện tập gõ phím mỗi ngày giúp bạn làm việc hiệu quả hơn.",
    "Github Pages là một công cụ tuyệt vời để host trang web cá nhân.",
    "Sáng tạo là chìa khóa để mở ra những cánh cửa mới của tương lai."
];

let timeLeft = 30;
let timer = null;
let isPlaying = false;
let charIndex = 0;
let mistakes = 0;

const typingBox = document.getElementById('typing-box');
const inputField = document.getElementById('hidden-input');
const wpmTag = document.getElementById('wpm');
const accTag = document.getElementById('accuracy');
const timerTag = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingBox.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span class="char">${char}</span>`;
        typingBox.innerHTML += span;
    });
    typingBox.querySelectorAll('span')[0].classList.add('current');
    
    // Reset các thông số
    inputField.value = "";
    charIndex = mistakes = 0;
    timeLeft = 30;
    isPlaying = false;
    timerTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    accTag.innerText = 100;
    clearInterval(timer);
}

function initTyping() {
    const characters = typingBox.querySelectorAll('span');
    let typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isPlaying) {
            timer = setInterval(startTimer, 1000);
            isPlaying = true;
        }

        if (typedChar == null) { // Nhấn Backspace
            charIndex--;
            if (characters[charIndex].classList.contains('wrong')) mistakes--;
            characters[charIndex].classList.remove('correct', 'wrong');
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('wrong');
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove('current'));
        if (charIndex < characters.length) characters[charIndex].classList.add('current');

        // Tính toán thông số
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((30 - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;

        let acc = Math.round(((charIndex - mistakes) / charIndex) * 100);
        accTag.innerText = charIndex > 0 ? acc : 100;
    } else {
        clearInterval(timer);
    }
}

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

// Lắng nghe sự kiện
inputField.addEventListener('input', initTyping);
restartBtn.addEventListener('click', loadParagraph);
document.addEventListener('keydown', () => inputField.focus());
typingBox.addEventListener('click', () => inputField.focus());

// Khởi tạo lần đầu
loadParagraph();
