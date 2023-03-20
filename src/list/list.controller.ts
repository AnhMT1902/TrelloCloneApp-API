import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./Dto/list.Dto";
import { BroadService } from "../broad/broad.service";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";
import { CardService } from "../card/card.service";

@Controller("list")
export class ListController {
  constructor(
    private listService: ListService,
    private broadService: BroadService,
    private cardService: CardService
  ) {
  }

  @Get(":id")
  async getOneList(@Res() res, @Param("id") id: string) {
    try {
      let list = await this.listService.findListById(id);
      res.status(200).json(list);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Post()
  async createList(@Res() res, @Body() list: CreateListDto) {
    try {
      console.log(list, 'listController.createList');
      let broadFind = await this.broadService.findBroadById(list.broad);
      list.index_broad = +broadFind.lists.length;
      let newList = await this.listService.createList(list);
      await broadFind.lists.push(newList);
      await this.broadService.updateBroad(broadFind._id, broadFind);
      res.status(201).json(newList);
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Put(":id")
  async updateList(@Res() res, @Body() list, @Param("id") id: string) {
    try {
      await this.listService.updateList(id, list);
      return res.status(200).json({
        message: "Successfully updated list",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Delete(":id")
  async deleteList(@Res() res, @Param("id") id: string) {
    try {
      let listFind = await this.listService.findListById(id);
      await this.listService.deleteList(id);
      await this.cardService.deleteCardByList(listFind);
      return res.status(200).json({
        message: "Successfully deleted list",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Put("/index")
  async updateIndex(@Res() res, @Body() list): Promise<any> {
    try {
      await this.listService.updateIndexBroad(list);
      return res.status(200).json({
        message: "Successfully updated index",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}