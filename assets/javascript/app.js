$(document).ready(function(){
    var main_body = $("#main-body");
    var questions = ["He who controls the spice controls?:","The gunslinger followed the?:","Do androids dream of?:","___ is watching you?:", "I can't let you do that __: ",
    "fear is the ___:","Don't ___: ","IT'S ____:","One who aims with their eyes has ___:","so long and ___:"];
    var responses = new Array(4);
    var total_questions =0;
    var wrong_questions=0;
    var right_answers=0;
    var completion = false;
    var right_answer = "";
    var question_count=$("#question-count");
    var question_bilboard=$("#question-display");
    var response_display=$("#response-display");
    var watch = $("#watch");
    var Control_Interval;
    var time = 30;



    
   function set_up_response_array(){
    for(let i=0; i < responses.length;i++){
        responses[i] = new Array(4);
    }
       responses[0]=["The world","The road","The universe","Flavortown"];
       responses[1]=["The dude","The man in black","Matthew McConaughey","Yellow brick road"];
       responses[2]=["Refactoring code","Electric sheep","Cybernetic Chickens","The great basilisk. the greatest invention of them all"];
       responses[3]=["fat albert","The party","Big brother","Uncle Sam"];
       responses[4]=["Dave","Jim","Hal","Star fox"];
       responses[5]=["spice of life","problem","mind killer","motivater"];
       responses[6]=["freak out","get confused","press that button","panic"];
       responses[7]=["DEAD JIM","ALIVE!","NOT WORKING","RIGHT THERE"];
       responses[8]=["good vision","missed the point","forgotten the face of their father","no heart"];
       responses[9]=["thanks for all the fish", "we're out of here","sorry about last night","always bring a towel"];
   }

    
    

    
    
    

    function make_answers(index){ ///needs to splice after answer generation
        for(let i=0;i<4;i++){
            let answer_space = $('<p class="answer-space">');
            let answer_text = responses[index][i];
            answer_space.appendTo(response_display);
            answer_space.html(answer_text);
            answer_space.data("text-data",answer_text);
            
        }
        
        
        
        
    }
    function make_question(){
        
        time = 30;
        question_to_display = questions[total_questions];
        find_right_answer(total_questions);
        make_answers(total_questions);
        watch.html("Time Left: " + time);
        question_count.html("Question #" + total_questions + ":");
        question_bilboard.html(question_to_display);
        total_questions++;
    }
    
    function clean_answers(){
        response_display.empty();
    }
    function game_over(){ ////will eventually bring up results screen but for now just refreshes page
        window.location.reload();

    }
    function find_right_answer(TQ){
        switch(TQ){
            case 0:{
                right_answer =responses[0][2];
                break;
            }
            case 1:{
                right_answer = responses[1][1];
                break;
            }
            case 2:{
                right_answer = responses[2][1];
                break;
            }
            case 3:{
                right_answer = responses[3][2];
                break;
            }
            case 4:{
                right_answer = responses[4][0];
                break;
            }
            case 5:{
                right_answer = responses[5][2];
                break;
            }
            case 6:{
                right_answer = responses[6][3];
                break;
            }
            case 7:{
                right_answer = responses[7][1];
                break;
            }
            case 8:{
                right_answer = responses[8][2];
                break;
            }
            case 9:{
                right_answer = responses[9][0];
                break;
            }

        }
    }
    function user_answer(element){
        console.log(element.data("text-data"));
        console.log(right_answer);
        if(element.data("text-data") !== right_answer){
            wrong_questions++;    
        }else{
            right_answers++;
        }


    }
    function endscreen(){
        let answer_space = $('<p class="answer-space">');
        
        clean_answers();
        watch.html("TIME");
        question_count.html("GAME OVER!");
        question_bilboard.html("YOUR SCORE: <br> Right Answers" + right_answers + "<br> Wrong Answers: " + wrong_questions + "<br> Final score: "+ (right_answers*10));
        answer_space.appendTo(response_display);
        answer_space.html("Restart?");
        

    }
    function check_state(){
        if(total_questions === responses.length){
            completion = true;
            endscreen();
            clearInterval(Control_Interval);
        }
    }
    function tick(){
        time--;
        watch.html("Time Left: " + time);
        
        if(time === 0){
            time = 30;
            wrong_questions++;
            clean_answers();
            make_question();
            check_state();
        }
    }

    //******************************************************code starts here************************************************ */
    set_up_response_array();
    make_question();

    Control_Interval = setInterval(() => {
        tick();
    },1000);
    
    response_display.on("click", ".answer-space", function(event){
        if(completion === false){
            clearInterval(Control_Interval);
            user_answer(response_display.find(event.target));
            clean_answers();
            make_question();
            check_state();
            Control_Interval = setInterval(() => {
                tick();
            },1000);
        

        }
        else{
            clearInterval(Control_Interval);
            game_over();
        }
        
    });

});
