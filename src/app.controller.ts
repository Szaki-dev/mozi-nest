import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getReservation() {
    return { errors: [], data: {} };
  }

  @Post()
  async postReservation(@Body() body: any, @Res() res: Response) {
    const errors: string[] = [];
    const { name, email, dateTime, guests } = body;

    if (!name || name.trim() === '') {
      errors.push('Név megadása kötelező!');
    }

    if (!email || !/^.+@.+$/.test(email)) {
      errors.push('E-mail cím formátuma helytelen (min. 1 karakter a @ előtt és után)!');
    }

    const date = new Date(dateTime);
    const now = new Date();
    if (!dateTime || isNaN(date.getTime()) || date < now) {
      errors.push('A dátum érvénytelen vagy a múltban van!');
    }

    const guestsNum = parseInt(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 10) {
      errors.push('A nézők száma 1 és 10 között kell legyen!');
    }

    if (errors.length > 0) {
      return res.render('index', { errors, data: body });
    }

    await this.appService.createReservation({
      name,
      email,
      dateTime: date,
      guests: guestsNum,
    });

    return res.redirect('/success');
  }

  @Get('success')
  @Render('success')
  getSuccess() {
    return {};
  }
}
