#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
// var EventService = require('./event.service.ts');
// import { EventService } from './event.service';
// var google_calendar = require('./main');
const fs = require('fs');
var google_calendar = require('./main');
// google_calendar.authorize(JSON.parse(google_calendar.content), google_calendar.listEvents);
//

amqp.connect('amqp://guest:guest@localhost:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      // console.log(" [x] Received %s", msg.content.toString());
      let json = JSON.parse(msg.content);
      google_calendar.run(json);
      // EventService.createEvent(json);
    }, {noAck: true});
  });
});
