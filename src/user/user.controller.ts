import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async readAll() {
    return this.userService.readAll();
  }
  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.readOne(id);
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @ParamId() id) {
    return this.userService.update(id, body);
  }

  @Patch(':id')
  async updatepartial(@Body() body: UpdatePatchUserDTO, @ParamId() id) {
    return this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}
