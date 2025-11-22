import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(data: { email: string; name?: string }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name || null,
        role: 'CLIENT',
        password: 'TEMP', // буде переписано Auth
      },
    });
  }
}
