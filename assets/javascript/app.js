$(document).ready(function(){
    var main_body = $("#main-body");
    var questions = ["He who controls the spice controls?:","The gunslinger followed the?:","Do androids dream of?:","___ is watching you?:", "I can't let you do that __: "];
    var responses = new Array(4);
    for(let i=0; i < responses.length;i++){
        responses[i] = new Array(4);
    }
   function set_up_response_array(){
       responses[0]=["The world","The road","The universe","Flavortown"];
       responses[1]=["The dude","The man in black","Matthew McConaughey","Yellow brick road"];
       responses[2]=["Refactoring code","Electric sheep","Cybernetic Chickens","The great basilisk. the greatest invention of them all"];
       responses[3]=["fat albert","The party","Big brother","Uncle Sam"];
       responses[4]=["Dave","Jim","Hal","Star fox"];
   }

    
    

    var total_questions =0;
    var wrong_questions=0;
    var completion = false;
    var question_count=$("#question-count");
    var question_bilboard=$("#question-display");
    var response_display=$("#response-display");
    set_up_response_array();
    

    function make_answers(index){ ///needs to splice after answer generation
        
        for(let i=0;i<4;i++){
            let answer_space = $('<p class="answer-space">');
            let answer_text = responses[index][i];
            answer_space.attr('id',i);
            answer_space.appendTo(response_display);
            answer_space.html(answer_text);
            answer_space.data("text-data",answer_text);
            

        }
        responses.splice(index,1);
        
        
        
    }
    function make_question(){
        let rand = Math.floor(Math.random()*questions.length); //sets up random number from questions array
        
        question_to_display = set_question_to_display(rand); //sets value for the current question

        make_answers(rand);
        question_count.html("Question #" + total_questions++ + ":");
        question_bilboard.html(question_to_display);
        
        
        
        




    }
    function set_question_to_display(rand){
       
        let the_question = questions[rand];
        
        if(questions.length > 1){
            questions.splice(questions.indexOf(the_question),1);

        }
        else{
          completion = true;  
        }
        
        return the_question;

    }
    function clean_answers(){
        response_display.empty();
    }
    function game_over(){ ////will eventually bring up results screen but for now just refreshes page
        alert("GAME OVER");
        window.location.reload();

    }
    function find_right_answer(){
        let the_question = question_bilboard.get('text');
        console.log(the_question);
    }




    make_question();
    //find_right_answer();
    
    response_display.on("click", ".answer-space", function(){
        if(completion === false){
            clean_answers();
            make_question();
        }
        else{
            game_over();
        }
        
    });

});
