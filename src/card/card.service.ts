import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card } from "./schema/card.schema";
import { Model } from "mongoose";
import { BoardFindDto } from "../broad/Dto/broad.Dto";

let injectModel = InjectModel;

@Injectable()
export class CardService {
  constructor(
    @injectModel(Card.name)
    private cardModel: Model<Card>
  ) {
  }

  async createCard(card): Promise<any> {
    return this.cardModel.create(card);
  }

  async findOneCard(id: string): Promise<Card> {
    return this.cardModel.findById(id).populate("list").populate("broad");
  }

  async updateCard(id: string, card): Promise<any> {
    return this.cardModel.updateOne({ _id: id }, { $set: card });
  }

  async deleteCard(id: string): Promise<any> {
    return this.cardModel.deleteOne({ _id: id });
  }

  async updateIndexList(cards): Promise<any> {
    cards.forEach((card, index) => {
      this.cardModel.updateOne({ _id: card._id }, { $set: { index_list: index + 1 } });
    });
  }

  deleteCardByList(list): Promise<any> {
    const cardId = list.cards.map((card) => card._id);
    this.cardModel.deleteMany({ _id: { $in: cardId } });
    return;
  }

  deleteCardByBoard(boardFind: BoardFindDto): Promise<any> {
    let cardsIds = [];
    boardFind.lists.map((list) =>
      list.cards.map((card) => cardsIds.push(card._id))
    );
    this.cardModel.deleteMany({ _id: { $in: cardsIds } });
    return;
  }
}