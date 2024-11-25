document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const questionContainer = document.getElementById('question-container');
    const resultcontainer = document.getElementById('result-container')
    const showResultDisplay = document.getElementById('show-result');
    // button elements
    const startBtn = document.getElementById('start-btn');
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');
    const resetBtn = document.getElementById('restart-btn');

    // quiz data
    const quizData = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Paris',
            selected: false,
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
            selected: false,
        },
          {
            question: "Who wrote 'Hamlet'?",
            options: [
              "Charles Dickens",
              "Jane Austen",
              "William Shakespeare",
              "Mark Twain",
            ],
            answer: "William Shakespeare",
            selected: false,
        },
        {
            question: 'What is the capital of Italy?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Rome',
            selected: false,
        },
        {
            question: 'What is the capital of Germany?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Berlin',
            selected: false,
        },
    ];

    // quiz variables
    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    // function to start the quiz
    function startQuiz() {
        startBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden')    
        showQuestion();
    }

    // previous button event
    previousBtn.addEventListener('click', () => previousQuestion());

    // previous question function
    function previousQuestion(){
        if(currentQuestionIndex > 0){
            previousBtn.disabled = false;
            currentQuestionIndex--;
            showQuestion();
        }
    }

    // next question button event
    nextBtn.addEventListener('click', nextQuestion)
    // next question function
    function nextQuestion(){
        currentQuestionIndex++;
        if(currentQuestionIndex < quizData.length){
            showQuestion();
        }else{
            showResult();
        }
    }

    // restart button event
    resetBtn.addEventListener('click', ()=> resetQuiz());

    // restart quiz function 
    function resetQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resultcontainer.classList.add('hidden');
    startQuiz();
    }

    // function to show the question
    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        if(currentQuestionIndex <= 0){
            previousBtn.disabled = true;
        }else{
            previousBtn.disabled = false;
        }
        // showing the options
        optionsList.innerHTML = " " // make sure privious options are removed
        currentQuestion.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.setAttribute('id', `option${index}`);
            li.textContent = `${index + 1}. ${option}`;
            li.addEventListener('click', () => selectedAnswer(option, index));
            optionsList.appendChild(li);
    })
    }

    // selected answer function
    function selectedAnswer(option, index) {
        const options = optionsList.children;
        // remove selected class from all options
        for(let i = 0; i < options.length; i++){
            options[i].classList.remove('selected');
        }

        // add selected class to the selected option
        document.getElementById(`option${index}`).classList.add('selected');

        // check if the question is already selected
        if(quizData[currentQuestionIndex].selected){
            return;
        }

        // mark the question as selected
        quizData[currentQuestionIndex].selected = true;
        
        const correctAnswer = quizData[currentQuestionIndex].answer;
        if(option === correctAnswer){
            score++;
        }
    }

    // function show result
    function showResult(){
        questionContainer.classList.add('hidden')
        resultcontainer.classList.remove('hidden')

        showResultDisplay.textContent = `${score} out of ${quizData.length}`;
    }

});