function buildQuiz(){
    const output = [];
    
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];

            for(letter in currentQuestion.answers){
                answers.push(
                `<label> <input type="radio" name="question${questionNumber}"
                value="${letter}" class="rad_butn">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
                );
            }

            output.push(
                `<div class="slide">
                <div class="question"> ${(questionNumber+1)}.
                ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        }
    );
    quizBox.innerHTML = output.join('');
}


function showResults(){
    const answerBoxs = quizBox.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach( (currentQuestion, questionNumber) => {
        const answerBox = answerBoxs[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerBox.querySelector(selector) || {}).value;
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerBoxs[questionNumber].style.color = 'green';
        }
        else{
            answerBoxs[questionNumber].style.color = 'red';
        }
    });
    resultsBox.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}


function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}


const quizBox = document.getElementById('quiz');
const resultsBox = document.getElementById('results');
const submitButton = document.getElementById('submit');
const tryAgainButton = document.getElementById("tryAgain");

const myQuestions = [];

for(i=0; i < data.length; i++){
    myQuestions.push(data[i]); // pushes the next question into our array. The loop cycles until it reaches the end of the dataset. In our case called ‘data’.
}

document.getElementById('quizLength').innerHTML = data.length;

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


/* =========================== FORM  ======================= */
function saveMyFile(){
    localStorage.setItem("questionBank", JSON.stringify(questionBank));
    location.replace("quiz.html")
}

const addQuestionButton = document.getElementById("submitQuestion");
//reference the submitQuestion button and store it in a variable called addQuestionButton

const saveButton = document.getElementById("saveQuestionBank");
//reference the saveQuestionBank button and store it in a variable called
bankButton

const questionBank = [];
//create a new empty array called questionBank

const newObject = localStorage.getItem("questionBank");
//retrieve the question bank from localStorage

let dataStored = JSON.parse(newObject);
//parse the JSON data into a new JavaScript object

if(dataStored != ""){ //if dataStored is not empty…
    for(i=0; i < dataStored.length; i++){
        questionBank.push(dataStored[i]);
    }
    //iterate through the dataStored array and push each question into the questionBank array
} else {
    for(i=0; i < data.length; i++){
        questionBank.push(data[i]);
    }
}

document.getElementById('qCount').innerHTML = questionBank.length;
//update the <h1> title tag with the current number of questions in our question bank

addQuestionButton.addEventListener("click", getMyData);
//Listen for the submit form button and when clicked call or invoke the getMyData() function

saveButton.addEventListener("click", saveMyFile);
//Listen for the save question bank button and when clicked call (invoke) the saveMyFile() function
