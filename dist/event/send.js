#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://guest:guest@localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        ch.assertQueue(q, { durable: false });
        var jsonObj = {
            "id": 2,
            "date": "Date2",
            "begin_time": "Begin_time2",
            "end_time": "End_time2",
            "email": ["shisyr2106@gmail.com", "talanbekov123@gmail.com"],
            "description": "Description2",
            "location": "Location2",
            "summary": "Summary2"
        };
        ch.sendToQueue(q, new Buffer(JSON.stringify(jsonObj)));
        console.log(" [x] Sent 'Hello World!'");
    });
});
//# sourceMappingURL=send.js.map