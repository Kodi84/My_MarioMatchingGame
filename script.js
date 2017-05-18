var first_card_clicked=null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
window.onload = function() {
    shuffle();
};

$(document).ready (function() {
    $('.reset').click(reset_stats);
    $('.mushroom').click(mushroom_clicked);

});

//shuffle cards
function shuffle() {
    var makeArray = $(".card").toArray();
    var swap_card;
    var sub_card;
    for (var i = makeArray.length - 1; i > 0; i--) {
        swap_card = Math.floor(Math.random() * i);
        sub_card = makeArray[i];
        makeArray[i] = makeArray[swap_card];
        makeArray[swap_card] = sub_card;
    }

    $("#game_area").empty();
    for (var j = 0; j < makeArray.length; j++) {
        var add_to_array = makeArray[j];
        $("#game_area").append(add_to_array);
    }

    $(".back").click(card_clicked);

}

var already_click_two_cards = false;

function card_clicked () {

    if(already_click_two_cards){
        return;
    }else{
        console.log('back card click');
        $(this).hide();//back card hide

        if (first_card_clicked === null) {
            first_card_clicked = $(this);
            return;
        }
        else {
            second_card_clicked = $(this);
            //attempts
            attempts++;
            $('.attempts > .value').text(attempts);
            if (($(first_card_clicked) .attr('class')) === ($(second_card_clicked).attr('class')))
            {
                match_counter++; //matches start counting
                matches++;
                $(".matching > .value").text(matches);

                var accuracy = (matches/attempts).toFixed(2)*100+('%'); //toFixed(2) = round to 2 decimal points

                $('.accuracy > .value').text(accuracy);

                first_card_clicked = null;
                second_card_clicked = null;
                if (total_possible_matches == match_counter) {
                    alert("YOU ARE THE WINNER");
                    //display something if possible matches = match counter
                } else {
                    return; //if possible match not equal to match counter return to where?
                }
            }
            else {
                setTimeout(timeOut, 1000);
                already_click_two_cards = true;

                return;
            }
        }
    }
    }

function timeOut() {
    $(first_card_clicked).show ();
    $(second_card_clicked).show();
    first_card_clicked = null;
    second_card_clicked = null;
    already_click_two_cards = false;
}


//when clicked on mushroom
function mushroom_clicked(){
    $('.back').hide();
    $(".mushroom").fadeOut(4000, function() {
        $(this).prop('disabled',true);
    });
    $(".rainbow").fadeOut(4000, function() {
        $(this).prop('disabled',true);
    });
    setTimeout(showAllBack, 3000);
    return;
}

//click for magic clicked
function showAllBack(){
    $('.back').show();
}

//reset button clicked
function reset_stats (){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    games_played++;

    $('.back').show();
    $('.games-played .value').text(games_played);
    $('.attempts  .value').text(attempts);
    $(".matching > .value").text(matches);
    $('.accuracy > .value').text(accuracy);
    shuffle();
    $(".mushroom").show(function() {
        $(this).prop('enabled',true);
    });
    $(".rainbow").show(function() {
        $(this).prop('enabled',true);
    });
    return;
}


