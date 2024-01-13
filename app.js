// getting required elements from index.html
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");


//If the Startbtn is clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");  //show the info box
}

//If the Exitbtn is clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");   // hide the info box
}

//If the Continuebtn is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the infobox
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    displayQuestions(0);                  // calling the function
    queCounter(1);
    startTimer(15);                      // start timer
    startTimerLine(0);
}

//An array containing the numbers, questions and options
let questions = [
    {
        num: 1,
        question: "What is the capital of France?",
        answer: "Paris",
        options: [
            "London",
            "Berlin",
            "Paris",
            "Madrid"
        ]
    },

    {
        num: 2,
        question: "In which year did Christopher Columbus first reached the Americans?",
        answer: 1492,
        options: [
            1492,
            1500,
            1607,
            1778
        ]
    },

    {
        num: 3,
        question: "Which planet is known as the 'Red Planet'?",
        answer: "Mars",
        options: [
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn"
        ]
    },

    {
        num: 4,
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare",
        options: [
            "Charles Dickens",
            "William Shakespeare",
            "Jane Austen",
            "Mark Twain"
        ]
    },

    {
        num: 5,
        question: "What is the largest mammal in the world?",
        answer: "Blue Whale",
        options: [
            "Elephant",
            "Blue Whale",
            "Giraffe",
            "Hippopotamus"
        ]
    },

    {
        num: 6,
        question: "What is the capital of Japan?",
        answer: "Tokyo",
        options: [
            "Bangtok",
            "Seoul",
            "Tokyo",
            "Beijing"
        ]
    },

    {
        num: 7,
        question: "What is the chemical symbol for Gold?",
        answer: "Au",
        options: [
            "Ag",
            "Fe",
            "Cu",
            "Au"
        ]
    },

    {
        num: 8,
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        options: [
            "Pablo Picasso",
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Michelangelo"
        ]
    },

    {
        num: 9,
        question: "Which element is essential for human bones and teeth?",
        answer: "Calcium",
        options: [
            "Iron",
            "Calcium",
            "Sodium",
            "Potassium"
        ]
    },

    {
        num: 10,
        question: "What is the largest ocean on earth?",
        answer: "Pacific Ocean",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Southern Ocean",
            "Pacific Ocean"
        ]
    }
];

let que_count = 0;
let que_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=> {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_num = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    displayQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
}
quit_quiz.onclick = ()=> {
    window.location.reload();
}


// if the nextbtn is clicked, this event shd occur
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_num++;
        displayQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    }else{
        console.log('Questions completed');
        displayResultBox();
    }
}

// getting questions and options from the array
const displayQuestions = (index)=>{
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].num + "." + ' ' + questions[index].question + '</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                   + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                   + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                   + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


const optionSelected = (answer)=> {
    clearInterval(counter);
    clearInterval(counterLine)
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // when answers are incorrect automatically display the correct answer
    for (let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
        
    }
    }


    // to disable other options so users won't have to select twice
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }
    next_btn.style.display = "block";
}

const displayResultBox = ()=>{
    info_box.classList.remove("activeInfo");  //hide the info box 
    quiz_box.classList.remove("activeQuiz");  //hide the quiz box 
    result_box.classList.add("activeResult");  //show the result box 
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 8){
        let scoreTag = '<span>and congrats! You got <p>'+ userScore +'</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 5){
        let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p>out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}



const queCounter = (index)=>{
    const bottomLeftQuesCounter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottomLeftQuesCounter.innerHTML = totalQuesCountTag;
}

function startTimer (time){
    const timer = ()=>{
        timeCount.textContent = time;
        time--;
        if(time < 9){
                let addZero = timeCount.textContent;
                timeCount.textContent = "0" + addZero;
            }
            if(time < 0) {
                    clearInterval(counter);
                    timeCount.textContent = "00";
                    timeOff.textContent = "Time Off";

                    let correctAns = questions[que_count].answer;
                    let allOptions = option_list.children.length;

                    for (let i = 0; i < array.length; i++) {
                        if(option_list.children[i].textContent == correctAns) {
                            option_list.children[i].setAttribute("class", "option correct");
                            option_list.childern[i].insertAdjacentHTML("beforeend", tickIcon);
                        };
                        
                    }
                    for (let i = 0; i < array.length; i++) {
                        option_list.children[i].classList.add("disabled");
                    }
                    next_btn.style.display = "block";
                }
            }
            counter = setInterval(timer, 1000);
}

const startTimerLine = (time)=>{
    const timer = ()=>{
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
    counterLine = setInterval(timer, 29);
}