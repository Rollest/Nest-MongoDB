import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':email')
  find(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Put(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':type/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, AuthorGuard)
  delete(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  @Patch('aggregate')
  aggregate() {
    console.log('aggre');

    return this.userService.aggregate();
  }
}
