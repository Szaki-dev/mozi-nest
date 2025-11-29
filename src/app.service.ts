import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: Prisma.ReservationCreateInput) {
    return this.prisma.reservation.create({ data });
  }
}
