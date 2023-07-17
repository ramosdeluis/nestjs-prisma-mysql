import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password, birthAt }: CreateUserDTO) {
    password = await bcrypt.hash(password, await bcrypt.genSalt());
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    });
  }

  async readAll() {
    return await this.prisma.user.findMany();
  }

  async readOne(id: number) {
    await this.exists(id);
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    password = await bcrypt.hash(password, await bcrypt.genSalt());
    await this.exists(id);
    return await this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: { id: id },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);
    const data: UpdatePatchUserDTO = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      password = await bcrypt.hash(password, await bcrypt.genSalt());
      data.password = password;
    }

    if (role) {
      data.role = role;
    }
    return await this.prisma.user.update({
      data,
      where: { id: id },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`User id '${id}' not found.`);
    }
  }
}
