const quizBox = document.getElementById('quiz');
const resultsBox = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [];

for(i=0; i < data.length; i++) {
    myQuestions.push(data[i]); // pushes the next question into our array. The loop cycles until it reaches the end of the dataset. In our case called ‘data’.
}

function buildQuiz(){
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
        const answers = [];

        for(letter in currentQuestion.answers){
            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}"
                value="${letter}" class="rad_butn">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );

            output.push(
                `<div class="slide">
                    <div class="question"> ${(questionNumber+1)}.
                    ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        }
            
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


buildQuiz();
submitButton.addEventListener('click', showResults);