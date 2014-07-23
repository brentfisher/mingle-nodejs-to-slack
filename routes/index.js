var xml2js = require('xml2js'),
  request = require('request'),
  parser = new xml2js.Parser(),
  Slack = require('node-slack'),
  sprintf = require("sprintf-js").sprintf;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.cards = function(req, res) {
  res.end();
};

exports.cards_post = function(req, res) {
  var regex = /^#card(.*)/i;
  try {
    var cardNum = req.body.text.match(regex)[1];
    console.log("Outbound Trigger - Card#" + cardNum);

    getCardByNumber(cardNum, function(card) {
      var cardName = card.name.shift();
      var owner = getCardProperty(card, "Owner");
      var estimate = getCardProperty(card, "Estimate");

      res.write(cardName + " " + owner + " " + estimate);

      sendSlack(cardName, owner, estimate);
      res.end();
    });

  } catch(e) {
    throw e; 
  }
};

function sendSlack(cardName, owner, estimate) {
  var message = sprintf("_%s_ - `%s` *%s*", cardName, owner, estimate);
  var slack = new Slack("careerbuilder", process.env.SLACK_TOKEN);
  slack.send({
    text: message,
    channel: '#random',
    username: 'MingleBot',
  });
};

function getCardProperty(card, propName) {
  var props = getProperties(card);
  var returnVal = "";
  props.forEach(function(p) {
    name = p["name"][0];
    if (name == propName) {
      var result = p.value[0].name;
      if (result && result.constructor == Array) { //array
        returnVal = p.value[0].name[0];
      } else {
        returnVal = p.value[0];
      }
    }
  });
  return returnVal;
};

function getProperties(card) {
  return card.properties[0].property;
};

function getCardByNumber(cardNum, callback) {
  var data = getCards(function(data) {
    data.cards.card.forEach(function(item) { 
      var num = item.number["0"]._;
      if (num == cardNum) {
        return callback(item);
      }
    });
  });
};

function getCards(callback) {
  request.get("https://"+ process.env.MINGLE_CREDS + "@careerbuilder.mingle.thoughtworks.com/api/v2/projects/consumer_intel/cards.xml", function(err, resp) {
    if (err) throw err;
    if (resp.body) {
      parser.parseString(resp.body, function(err, data){
        return callback(data);
      });
    }
  });
};
