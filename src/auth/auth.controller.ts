import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./Dto/createUserDto";
import { JwtAuthGuard } from "./middleware/JwtAuthGuard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("signup")
  async register(@Body() userDto: CreateUserDto, @Res() res: Response): Promise<any> {
    try {
      await this.authService.register(userDto);
      return res.status(200).json({
        message: "register success",
        checked: true
      });
    } catch (e) {
      return res.status(401).json({
        error: e.message
      });
    }
  }

  @Post("login")
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const accessToken = await this.authService.checkLogin(req.body);
      console.log(accessToken);
      return res.status(200).json(accessToken);
    } catch (e) {
      return res.status(401).json({
        error: e.message
      });
    }
  }
}