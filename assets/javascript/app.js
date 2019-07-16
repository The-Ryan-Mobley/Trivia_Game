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
    var question_count=$("#question-count");
    var question_bilboard=$("#question-display");
    var response_display=$("#response-display");
    set_up_response_array();
    

    function make_question(){
        
        var question_to_display = questions[total_questions];
        questions.splice(question_to_display);
        for(let i =0; i<4;i++){
            response_display.append(responses[total_questions][i]);

        }
        question_count.html("Question #" + total_questions++ + ":");
        question_bilboard.html(question_to_display);
        




    }
    make_question();

});
