(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Simon() {
  this.colors = ['red', 'blue', 'green', 'yellow'];
  this.gameArray = [];
  this.playerArray = [];
}

Simon.prototype.nextColor = function() {
  var randIndex = Math.floor(Math.random() * 4);
  this.gameArray.push(this.colors[randIndex]);
  return this.gameArray;
};

Simon.prototype.compare = function() {
  var length = this.playerArray.length;
  var output;
  for (var i = 0; i < length; i++) {
    if (this.playerArray[i] != this.gameArray[i]) {
      output = this.gameArray.length-1;
      this.playerArray = [];
      this.gameArray = [];
    }
  }
  if (this.gameArray.length === length && output === undefined) {
    this.playerArray = [];
    output = "success";
  }
  console.log(output);
  return output;
};

exports.simonModule = Simon;

},{}],2:[function(require,module,exports){
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

var apiKey = "532354385b64b7b961b27c505a6176cf"

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
    });
  });
});

},{"./../js/simon.js":1}]},{},[2]);
