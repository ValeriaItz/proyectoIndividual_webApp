function submitForm(event){
    event.preventDefault();
}

function getMyData(){
    const question = document.getElementById("qn").value +". " + document.getElementById("q").value;
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;
    const c = document.getElementById("c").value;
    const d = document.getElementById("d").value;
    const correctAnswer = document.getElementById("ca").value;
    const newData = { question, answers: { a, b, c, d }, correctAnswer } //form our object using the collected values
    if(question != "" && a != "" && b != "" && c != "" && d != "" && correctAnswer != ""){
        questionBank.push(newData);
        document.getElementById('qCount').innerHTML = questionBank.length;
        document.getElementById("addQuestion").reset();
    }
    return questionBank;
}


/* =========================== FORM1  ======================= */
function saveMyFile(){
    localStorage.setItem("questionBank", JSON.stringify(questionBank));
    location.replace("quiz.html")
}

const addQuestionButton = document.getElementById("submitQuestion");
//reference the submitQuestion button and store it in a variable called addQuestionButton

const saveButton = document.getElementById("saveQuestionBank");
//reference the saveQuestionBank button and store it in a variable called
bankButton

const questionBank = []; //create a new empty array called questionBank

const newObject = localStorage.getItem("questionBank"); //retrieve the question bank from localStorage

let dataStored = JSON.parse(newObject); //parse the JSON data into a new JavaScript object

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