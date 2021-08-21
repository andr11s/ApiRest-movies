import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/createUserDto';
import { UpdateUserDto } from 'src/modules/user/dto/updateUserDto';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUserAll() {
    try {
      const users = await this.userModel.find();

      if (users.length > 0) {
        return {
          ok: true,
          data: users,
          message: 'Listado de usuario registrados',
        };
      } else {
        return {
          ok: true,
          data: [],
          message: 'No se encontro registo de usuarios',
        };
      }
    } catch (error) {}
  }

  async createUser(userDto: CreateUserDto) {
    const userExist: any = await this.getUserByEmail(userDto.email);

    if (userExist.length === 0) {
      const newUser = new this.userModel({
        name: userDto.name,
        email: userDto.email,
      });

      try {
        const createUser = await newUser.save();
        return {
          message: `Usuario ${createUser.name} creado con exito,`,
          error: false,
        };
      } catch (error) {
        return {
          message: 'Error al consultar la BD',
          error: true,
        };
      }
    } else {
      return {
        message: 'El usuario no existe en la base de datos',
        error: true,
      };
    }
  }

  async updateUser(userDto: UpdateUserDto) {
    const userExists: any = await this.getUserByEmail(userDto.email);

    if (!userExists.ok) {
      try {
        const updateUser = await this.userModel
          .findByIdAndUpdate({ _id: userDto.id }, userDto, { new: true })
          .exec();
        return {
          message: `Usuario ${updateUser.name} se actualizo con exito,`,
          error: false,
        };
      } catch (error) {
        return {
          message: 'Error al consultar la BD',
          error: true,
        };
      }
    } else {
      return {
        message: 'El usuario no existe en la base de datos',
        error: true,
      };
    }
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    try {
      const user = await this.userModel.findById({ _id: id });
      return user;
    } catch (error) {
      return {
        message: 'El usuario no existe en la base de datos',
        error: true,
      };
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel
        .find({ email }, 'name email img role')
        .exec();
      return user;
    } catch (error) {
      return {
        message: 'El usuario no existe en la base de datos',
        error: true,
      };
    }
  }
}
