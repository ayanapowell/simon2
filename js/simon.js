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
