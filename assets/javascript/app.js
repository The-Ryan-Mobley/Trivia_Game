$(window).on('load',function(){
    //var main_body = $("#main-body"); thought i would need it but i didnt
    var questions = ["He who controls the spice controls _:","The gunslinger followed the _:","Do androids dream of _?:","_ is watching you?:", "I'm afraid I can't do that _: ",
    "fear is the _:","Don't _: ","IT'S _:","Luke i am your _:","so long and _:"]; //holds all asked questions
    var responses = new Array(10); //array holds answers
    var total_questions =0; //counts based on index of array
    var question_number = 1; //counts user questions
    var wrong_questions=0; 
    var right_answers=0;
    var completion = false; //flags if the game is finished or not
    var right_answer = ""; //holds value for correct answer on given question
    var question_count=$("#question-count");      //main jquery elements
    var question_bilboard=$("#question-display");
    var response_display=$("#response-display");
    var watch = $("#watch");
    var pic_element = $('<img>');
    var Control_Interval;  //interval varible
    var time = 30; //time counter
    var question_pic = new Image(); //image display
    var game_start = false; //flags if the game is in progress
     
   function set_up_response_array(){                            //stores possible answers in a 2d array
    for(let i=0; i < responses.length;i++){
        responses[i] = new Array(4);
    }
       responses[0]=["The world","The road","The universe","Flavortown"];
       responses[1]=["The dude","The man in black","Matthew McConaughey","Yellow brick road"];
       responses[2]=["Refactoring code","Electric sheep","Cybernetic Chickens","The great basilisk. the greatest invention of them all"];
       responses[3]=["Fat Albert","The party","Big Brother","Uncle Sam"];
       responses[4]=["Dave","Jim","Hal","Star fox"];
       responses[5]=["spice of life","problem","mind killer","motivater"];
       responses[6]=["freak out","get confused","press that button","panic"];
       responses[7]=["DEAD JIM","ALIVE!","NOT WORKING","RIGHT THERE"];
       responses[8]=["Bother","Father","Brother","Father's brother's nephew's cousin's former roommate"];
       responses[9]=["thanks for all the fish", "we're out of here","sorry about last night","always bring a towel"];
   }

    function make_answers(index){                           //generates the four choices for each question
        for(let i=0;i<4;i++){
            let answer_space = $('<button class="answer-space">');
            let answer_text = responses[index][i];
            answer_space.appendTo(response_display);
            answer_space.html(answer_text);
            answer_space.data("text-data",answer_text); 
        }  
    }
    function make_question(){                               //finds the new question then if the game is going displays the question and answers
        time = 30;
        question_to_display = questions[total_questions];
        if(completion === false){
            make_answers(total_questions);
            find_right_answer(total_questions);
            question_count.html("Question #" + question_number + ":");
            watch.html("Time Left: " + time);
            question_bilboard.html(question_to_display);
        }
        question_number++;                              //ticks up to progress game
        total_questions++;
    }
    
    function clean_answers(){                       //easier to keep track of then .empty
        response_display.empty();
    }
    function game_over(){                           //same as before
        window.location.reload();
    }
    function find_right_answer(TQ){                                                 //holds right answers and corresponding images in an array using total_questios as an index
        let right_list = ["The universe","The man in black","Electric sheep","Big Brother","Dave",
        "mind killer","panic","ALIVE!","Father","thanks for all the fish"];
        let source_list = ["assets/images/spice_must_flow.jpg","assets/images/a24321d3060379def7dd0e1c7d53af47.jpg",
        "assets/images/bits_bladerunner.1.jpg","assets/images/320998.jpg","assets/images/Im+afraid+i+cant+let+you+do+that+dave+_51f9a022cee2586facec11d87b7f82c4.png",
        "assets/images/image-fear-is-the-mind-killer-720x405.jpg","assets/images/Hitchhikers-Guide-Dont-Panic-Thumb-975-Decal-Sticker.jpg",
        "assets/images/FrankMonster.jpg","assets/images/_50101230_file0011.jpg","assets/images/2405_shirt_ee9da7c533758fb00eb7be9a1c5bfb44.gif"];
        right_answer = right_list[TQ];
        question_pic.src = source_list[TQ];
    }
    function user_answer(element){                                         //checks whether the user selected the right answer, also displays start image
        if(game_start === true){
            if(element.data("text-data") !== right_answer){
                wrong_questions++;
                pic_element.attr("src","assets/images/33563271-wrong-red-rubber-stamp-over-a-white-background-.jpg");    
            }else{
                right_answers++;
                pic_element.attr("src", question_pic.src);   
            }
        }
        else{
            pic_element.attr("src","assets/images/kisspng-product-design-marketing-consumer-behaviour-custom-5b7d9aa283e516.7737241115349582425403.png");
            game_start = true;
        }
        
    }
    function endscreen(){                                               //appears at the end of the game and displays score and reset option
        
        let restart_button = $('<button class="answer-space">');
        watch.html("TIME");
        question_count.html("GAME OVER!");
        question_bilboard.html("YOUR SCORE: <br> Right Answers" + right_answers + "<br> Wrong Answers: " + wrong_questions + "<br> Final score: "+ (right_answers*10));
        restart_button.appendTo(response_display);
        restart_button.html("Restart?");
    }
    function check_state(){                                     //checks if the game has reached the end of the questions array or not
        if(total_questions === responses.length){
            clearInterval(Control_Interval);
            endscreen();
            completion = true;      
        }   
    }
    function new_set_up(){                                      //clears out old elements and puts new ones in
        if(completion === false){
            clean_answers();
            check_state()
            make_question();
        }  
    }
    function tick(){                                        //checks if the user has waited too long to answer
        time--;
        watch.html("Time Left: " + time);
        if(time === 0){
            time = 30;
            wrong_questions++;
            new_set_up();
        }
    }
    function in_between(){                                    ///displays image inbetween questions array question if right red x if wrong
        clean_answers();
        
        pic_element.height(200);
        pic_element.width(300);
        pic_element.appendTo(response_display);
        setTimeout(()=>{
            time =30;
            new_set_up();
            
        },1000);

    }
    function start_screen(){                                        //displays start screen
        let answer_space = $('<button class="answer-space">');
        watch.html("You have 30 seconds")
        question_bilboard.html("Pick the right answer before time runs out");
        answer_space.appendTo(response_display);
        answer_space.html("START!");
    }

    //******************************************************code starts here************************************************ */
    set_up_response_array();
    start_screen();
    
    response_display.on("click", ".answer-space", function(event){             //cycles the questions and at the end resets
        if(completion === false){
            clearInterval(Control_Interval);
            user_answer(response_display.find(event.target));
            in_between(response_display.find(event.target));
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
