import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./Dto/list.Dto";
import { BroadService } from "../broad/broad.service";

@Controller("list")
export class ListController {
  constructor(private listService: ListService,
              private broadService: BroadService) {
  }

  @Get(":id")
  async getOneList(@Res() res, @Param("id") id: string) {
    try {
      let list = await this.listService.getOneList(id);
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
      let newList = await this.listService.createList(list);
      let broadFind = await this.broadService.findBroadById(list.broad.toString());
      console.log(broadFind, "trc");
      await broadFind[0].lists.push(newList.broad);
      console.log(broadFind, "sau");
      console.log(await this.broadService.findBroadById(list.broad.toString()), "sau thêm thì tìm");
      await this.broadService.updateBroad(broadFind._id, broadFind);
      res.status(201).json({
        message: "Successfully created list",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Put()
  async updateList(@Res() res, @Body() list: CreateListDto) {

  }

}