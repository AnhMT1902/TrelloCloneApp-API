import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./Dto/createUserDto";
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

  async register(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userDto.email;
    user.password = await this.hashPassword(userDto.password, 10);
    if (await this.checkEmail(user.email)) {
      throw new UnauthorizedException("Invalid username");
    }
    return this.userModel.create(user);
  };

  private async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    return !!user;
  };

  async checkLogin(userLogin: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: userLogin.email });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const is_equal = await bcrypt.compare(userLogin.password, user.password);
    console.log(is_equal);
    if (!is_equal) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    const payload = { email: user.email, sub: user.password };
    return {
      accessToken: this.JwtService.sign(payload)
    };
  }
}

