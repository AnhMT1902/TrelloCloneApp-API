import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto, FindUserDto, LoginUserDto } from "./Dto/user.Dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private JwtService: JwtService
  ) {
  }

  async register(userDto: CreateUserDto): Promise<any> {
    const user = new User();
    user.email = userDto.email;
    user.name = userDto.name;
    user.password = await this.hashPassword(userDto.password, 10);
    if (await this.findUserByEmail(user.email)) {
      throw new UnauthorizedException("Invalid email");
    }
    await this.userModel.create(user);
    const userRegister: User = await this.userModel.findOne({ email: user.email });
    userRegister.password = userDto.password;
    return await this.checkLogin(userRegister);
  };

  private async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findUserByEmail(email: string): Promise<FindUserDto> {
    return this.userModel.findOne({ email: email });
  };

  async checkLogin(userLogin: LoginUserDto): Promise<any> {
    const user = await this.findUserByEmail(userLogin.email);
    if (!user) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    const is_equal = await bcrypt.compare(userLogin.password, user.password);

    if (!is_equal) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    const payload = { email: user.email, sub: user.password, name: user.name, _id: user._id.toString() };
    // const token = await this.JwtService.sign(payload, );
    return {
      accessToken: this.JwtService.sign(payload)
    };
  }
}

