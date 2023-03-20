import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./Dto/user.Dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  async register(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
    @Req() req): Promise<any> {
    try {
      let accessToken = await this.authService.register(userDto);
      return res.status(200).json(accessToken);
    } catch (error) {
      return res.status(400).json(
        error
      );
    }
  }

  @Post("login")
  async login(@Body() body, @Res() res): Promise<any> {
    try {
      const accessToken = await this.authService.checkLogin(body);
      return res.status(200).json(accessToken);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}