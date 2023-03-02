import { Body, Controller, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { BroadService } from "./broad.service";
import { CreateBroadDto } from "./Dto/broad.Dto";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/schema/user.schema";
import { findUserDto } from "../auth/Dto/user.Dto";

@Controller("broad")
export class BroadController {
  constructor(private readonly broadService: BroadService,
              private readonly authService: AuthService) {
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createBroad(@Req() req, @Res() res, @Body() broad: CreateBroadDto): Promise<void> {
    try {
      let userAuth = req.user;
      await this.broadService.createBroad(broad);
      return res.status(200).json({
        message: "create broad success"
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Post(":id")
  async addMember(@Res() res, @Param("id") idBroad: string, @Body() emailMember: string): Promise<any> {
    try {
      let userAuth: Promise<findUserDto> = this.authService.findUserByEmail(emailMember);
      await this.broadService.addMember(idBroad, userAuth);
      return res.status(200).json({
        message: "add member success"
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}