import { Controller, Get, Post, Put, Delete, Param, Res, Body } from "@nestjs/common";
import { CardService } from "./card.service";
import { ListService } from "../list/list.service";

@Controller("card")
export class CardController {
  constructor(
    private cardService: CardService,
    private listService: ListService
  ) {
  }

  @Get(":id")
  async getCard(@Param("id") id: string, @Res() res) {
    try {
      let card = await this.cardService.findOneCard(id);
      return res.status(200).json(card);
    } catch (error) {
      res.status(404).json(
        error
      );
    }
  }

  @Post()
  async createCard(@Body() card, @Res() res): Promise<any> {
    try {
      let listFind = await this.listService.findListById(card.lists);
      card.index_list = listFind.cards.length;
      let newCard = await this.cardService.createCard(card);
      listFind.cards.push(newCard);
      await this.listService.updateList(listFind._id, listFind);
      return res.status(200).json(newCard);
    } catch (error) {
      res.status(404).json(
        card
      );
    }
  }

  @Put(":id")
  async updateCard(@Param("id") id: string, @Body() card, @Res() res): Promise<any> {
    try {
      await this.cardService.updateCard(id, card);
      return res.status(200).json({
        message: "Successfully updated card",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }

  @Delete(":id")
  async deleteCard(@Param("id") id: string, @Res() res) {
    try {
      await this.cardService.deleteCard(id);
      return res.status(200).json({
        message: "Successfully deleted card",
        checked: true
      });
    } catch (error) {
      return res.status(401).json(
        error
      );
    }
  }
}