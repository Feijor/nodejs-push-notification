# Node.JS-Push-FCM

This a simple implemetation to Push Notification for Firebase Clould Message in Android using the lib "node-fcm" for Node.JS.

## How it works

Add the 'index.js' in your project and replace this vars:

'your_senderID' for your senderID;
'your_pass' for password of cert;
'your_bounder_id' for Bounder ID;

Create a cert.pem and key.pem. These comands can help you:

``` 

$ openssl x509 -in aps.cer -inform DER -outform PEM -out cert.pem
$ openssl pkcs12 -in push1.p12 -out key.pem -nodes

```

The SenderID stay avaible in your [Firebase](https://firebase.google.com/?hl=pt-br) dashboard.

The cert.pem and key.pem avaible in your Apple Dashboard.

This lib have a dependence to [Node-APN](https://github.com/node-apn/node-apn).
This lib have a dependence to [FCM-Node](https://github.com/jlcvp/fcm-node). 

Install before use. 

## How to use

Call the ```addToken()``` and pass the device token and plaftform('android','ios').(you can add others tokens for send a only time)

Call the  ```send()``` and pass a message in json for send. The JSON message need this format {"titulo":"This a teste", "body":"This a message in push"}

## Example

```
var push = require('./index');

push.addToken('your_token','your_platform');

push.send({"titulo":"This a teste", "body":"This a message in push"});
```


## Contribute

Any pull-request and issue is more than welcome.

## License

[The MIT License (MIT) Copyright (c) 2013](http://opensource.org/licenses/MIT) 