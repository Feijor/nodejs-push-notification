var gcm = require('node-gcm');
var apn = require('apn');
var tokensAndroid = [];
var tokensIOS = [];
var senderID = 'your_senderID';

class pushoModel {
  
  addToken(token,platform) {
    if(platform){
      if(platform.toLowerCase() == 'android'){
        tokensAndroid.push(token);
      }
      
      if(platform.toLowerCase() == 'ios'){
        tokensIOS.push(token);
      }
    }
  }
  
  send(messagep){
    var msgAndroid = {'title': messagep.titulo, 'body': messagep.msg, 'icon':'ic_launcher'};

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

    if(tokensIOS){

      tokensIOS = Array.from(new Set(tokensIOS));

      let service = new apn.Provider({
        cert: "./lib/cert.pem",
        key: "./lib/key.pem",
        passphrase: 'your_pass',
        production: true
      });
      
      let note = new apn.Notification();
      
      note.topic = "your_bounder_id";
      note.expiry = Math.floor(Date.now() / 1000) + 3600;
      note.badge = 3;
      note.sound = "ping.aiff";
      note.alert = messagep.titulo; 
      note.body = messagep.msg;
      note.title = messagep.titulo;
      note.payload = {'messageFrom': 'teste'};

      console.log(`Sending: ${note.compile()} to ${tokensIOS}`);
      service.send(note, tokensIOS).then( result => {
          console.log("sent:", result.sent.length);
          console.log("failed:", result.failed.length);
          console.log(result.failed);
      });

      service.shutdown();
    }
  }
}

module.exports = new pushoModel();