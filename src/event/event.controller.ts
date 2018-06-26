#!/usr/bin/env node

import { Get, Post, Body, Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './create.event.dto';
import { google_calendar } from './main';
// const google_calendar = require('./main');

 //const amqp = require('amqplib/callback_api');
import { amqp } from 'amqplib/callback_api';
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  amqp.connect('amqp://guest:guest@localhost:5672', (err,conn) =>  {
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
  // @Post('/create')
  // createEvent(@Body() createEventDto: CreateEventDto){
  //   this.eventService.createEvent(createEventDto);
  // }
  // @Get()
  // findAll(): JSON {
  //   return this.eventService.findAll();
  // }
}
