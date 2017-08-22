const Model = require('../../lib/facade');
var gcm = require('node-gcm');
var tokensAndroid = [];
var tokensIOS;
var senderID = 'your_sender_ID';

class pushoModel extends Model {
  
  addToken(token,platform) {
    if(platform.toLowerCase() == 'android'){
      tokensAndroid.push(token);
    }
    
    if(platform.toLowerCase() == 'ios'){
      tokensIOS = tokensIOS + ' ' + token;
    }
  }
  
  send(messagep){
    var msgAndroid = {'title': messagep.titulo, 'body': messagep.msg, 'icon':'ic_launcher'};
    var msgIos = {'title': messagep.titulo, 'body': messagep.msg, 'icon':'ic_launcher'};

    if(tokensAndroid.length > 0){
      var message = new gcm.Message({
        data: {
          key1: 'msg'
        },
        notification: msgAndroid
      });
      
      var sender = new gcm.Sender(senderID);
      tokensAndroid = Array.from(new Set(tokensAndroid));

      sender.sendNoRetry(message, { registrationTokens: tokensAndroid }, function(err, response) {
        if(err) console.error(err);
        else    console.log(response);
      });
    }
  }
}

module.exports = new pushoModel();