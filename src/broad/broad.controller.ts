import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { BroadService } from "./broad.service";
import { CreateBroadDto, UpdateBroadDto } from "./Dto/broad.Dto";
import { AuthService } from "../auth/auth.service";
import { FindUserDto } from "../auth/Dto/user.Dto";
import { Broad } from "./schema/broad.schema";

@Controller("broad")
export class BroadController {
  constructor(private readonly broadService: BroadService,
              private readonly authService: AuthService) {
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createBroad(@Req() req, @Res() res, @Body() broad: CreateBroadDto): Promise<void> {
    try {
      await this.broadService.createBroad(broad);
      return res.status(200).json({
        message: "create broad success",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Get(":id")
  async getBroad(@Req() req, @Res() res, @Param("id") id: string): Promise<Broad> {
    try {
      let broadFind = await this.broadService.findBroadById(id);
      return res.status(200).json(broadFind);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Put(":id")
  async updateBroad(@Req() req, @Res() res, @Param("id") id: string, @Body() broad: UpdateBroadDto): Promise<void> {
    try {
      await this.broadService.updateBroad(id, broad);
      res.status(200).json({
        message: "update broad success",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Delete(":id")
  async deleteBroad(@Res() res, @Param("id") idBroad: string): Promise<any> {
    try {
      await this.broadService.deleteBroadById(idBroad);
      res.status(200).json({
        message: "delete broad success",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}