#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
const fs = require('fs');
var google_calendar = require('./main');
amqp.connect('amqp://guest:guest@localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        ch.assertQueue(q, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            let json = JSON.parse(msg.content);
            google_calendar.run(json);
        }, { noAck: true });
    });
});
//# sourceMappingURL=receive.js.map