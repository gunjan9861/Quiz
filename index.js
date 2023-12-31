

const questions = [
    {
        question:"What is the capital city  of Nepal?",
        answers:[
            {text:"Pokhara",correct:false},
            {text:"Kathmandu",correct:true},
            {text:"Biratnagar",correct:false},
            {text:"Bhaktapur",correct:false}
        ]
    },
    {
        question:"What is the capital city  of India?",
        answers:[
            {text:"New Delhi",correct:true},
            {text:"Mumbai",correct:false},
            {text:"Chennai",correct:false},
            {text:"Bangalore",correct:false}
        ]
    },

]
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-button')

let currentQuestionIndex = 0

let score = 0

function startQuiz(){
    currentQuestionIndex = 0

    score = 0 
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
function selectAnswer(e){
    const SelectedBtn =e.target
    const isCorrect = SelectedBtn.dataset.correct == "true"
    if(isCorrect){
        SelectedBtn.classList.add("correct")
        score++

    }
    else{
        SelectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled=true
    });
    nextButton.style.display='block'
}
function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`

    nextButton.innerHTML = 'Play Again'

    nextButton.style.display = 'block'
}
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()

    }
    else{
        showScore()
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()

