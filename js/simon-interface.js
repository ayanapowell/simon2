var Simon = require('./../js/simon.js').simonModule;

$(document).ready(function() {
  $('#time').text(moment());
  var game = new Simon();

  function showSequence() {
    game.nextColor();
    var i = 1;
    game.gameArray.forEach(function(color) {
      setTimeout(function() {
        $('#' + color).children().addClass('opaque');
        setTimeout(function() {
          $('#' + color).children().removeClass('opaque');
        }, 500);
      }, 600*i);
      i++;
    });
  }

  $('#start').click(function() {
    showSequence();
    $('#instructions').hide();
    $('#pokeball').children().attr('src', 'img/pokeball.svg');
  });

  $('.color').mouseup(function() {
    $(this).removeClass('opaque');
    game.playerArray.push($(this).parent().attr('id'));
    var result = game.compare();
    if (result == 'success') {
      setTimeout(showSequence(), 2000);
    } else if (result != undefined) {
      $('#pokeball').children().attr('src', 'img/meowth.svg');
      $('#instructions').html("Meowth says YOU LOSE after " + result + " turns!<br><br> Click Meowth to play again!");
      $('#instructions').show();
    }
  });

  $('.color').mousedown(function() {
    $(this).addClass('opaque');
  });

  $('.color').mouseleave(function() {
    $(this).removeClass('opaque');
  });

});
