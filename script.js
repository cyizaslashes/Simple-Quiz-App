const questions=[ {
    question: "Which is the largest Mammal in the world?",
    answers: [
        {text:"Shark",correct:false},
        {text:"blue whale",correct:true},
        {text:"Elephant",correct:false},
        {text:"Giraffe",correct:false},
    ]
},
{
    question: "What is the most abundant element on Earth?",
    answers: [
        {text:"Oxygen",correct:false},
        {text:"Hydrogen",correct:true},
        {text:"Silicon",correct:false},
        {text:"Sodium",correct:false},
    ]
},
{
    question: "Which is the smallest Country in the world?",
    answers: [
        {text:"Vatican",correct:true},
        {text:"Wales",correct:false},
        {text:"Rwanda",correct:false},
        {text:"Fiji",correct:false},
    ]
}
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    
    });
}

function resetState(){
    nextButton.style.display = "none";
    while( answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =  true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = 'play Again';
    nextButton.style.display
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
