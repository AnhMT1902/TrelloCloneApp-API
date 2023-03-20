import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { BroadService } from "./broad.service";
import { UpdateBroadDto } from "./Dto/broad.Dto";
import { Broad } from "./schema/broad.schema";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";
import { CardService } from "../card/card.service";
import { ListService } from "../list/list.service";

@Controller("broad")
@UseGuards(JwtAuthGuard)
export class BroadController {
  constructor(
    private cardService: CardService,
    private listService: ListService,
    private broadService: BroadService
  ) {
  }

  @Post()
  async createBroad(@Req() req, @Res() res, @Body() broad): Promise<void> {
    try {
      broad.users = req.user._id;
      let boardCreate = await this.broadService.createBroad(broad);
      return res.status(200).json(
        boardCreate
      );
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Get(":id")
  async getBroad(@Res() res, @Param("id") id: string): Promise<Broad> {
    try {
      const broadFind = await this.broadService.findBroadById(id);
      broadFind.lists = broadFind.lists.sort((a, b) => a.index_broad - b.index_broad);
      broadFind.lists.forEach((list) => {
        list.cards = list.cards.sort((a, b) => a.index_list - b.index_list);
      });
      return res.status(200).json(broadFind);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Put(":id")
  async updateBroad(@Res() res, @Param("id") id: string, @Body() broad: UpdateBroadDto): Promise<void> {
    try {
      let boardUpdate = await this.broadService.updateBroad(id, broad);
      res.status(200).json(boardUpdate);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Delete(":id")
  async deleteBroad(@Res() res, @Param("id") idBroad: string): Promise<any> {
    try {
      let boardFind = await this.broadService.findBroadById(idBroad);
      await this.broadService.deleteBroadById(idBroad);
      await this.listService.deleteListsByBoard(boardFind);
      await this.cardService.deleteCardByBoard(boardFind);
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

  @Get("/")
  async getAllBroadByUser(@Res() res, @Body() user: string, @Req() req, @Param("id") id: string): Promise<Broad[]> {
    try {
      let broadsList = await this.broadService.findAllBroadByUser(req.user._id);
      return res.status(200).json(broadsList);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}