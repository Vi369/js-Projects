document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const showResult = document.getElementById('show-result');

    // button elements
    const startBtn = document.getElementById('start-btn');
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');
    const resetBtn = document.getElementById('reset-btn');

    // quiz data
    const quizData = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Paris',
        },
        {
            question: 'What is the capital of Italy?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Rome',
        },
        {
            question: 'What is the capital of Germany?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            answer: 'Berlin',
        },
    ];

    // quiz variables
    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);

    // function to start the quiz
    function startQuiz() {
        startBtn.classList.add('hidden');
        previousBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        showQuestion();
    }

    // function to show the question
    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        // showing the options
        optionsList.innerHTML = ''; // make sure privious options are removed
        currentQuestion.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${option}`;
            li.addEventListener('click', () => selectedAnswer(option));
            optionsList.appendChild(li);
    })
    }

    // selected answer
    function selectedAnswer(option) {
        
    }
});