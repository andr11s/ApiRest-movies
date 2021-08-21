import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/getUsers')
  async findAll(@Res() res: any) {
    const users = await this._userService.getAll();
    return res.status(HttpStatus.OK).send(users);
  }

  @Get('/getUserid/:id')
  async getUserid(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Res() res: any,
  ) {
    const user = await this._userService.getUserById(id);
    return res.status(HttpStatus.OK).send(user);
  }

  @Post('/createUser')
  async create(
    @Body() createUser: CreateUserDto,
    @Res() res: any,
  ): Promise<CreateUserDto> {
    const newUser = await this._userService.createUser(createUser);
    return res.status(HttpStatus.CREATED).send(newUser);
  }

  @Put('/updateUser')
  async update(
    @Body() updateUsers: UpdateUserDto,
    @Res() res: any,
  ): Promise<UpdateUserDto> {
    const updateUser = await this._userService.updateUser(updateUsers);
    return res.status(HttpStatus.OK).send(updateUser);
  }
}
