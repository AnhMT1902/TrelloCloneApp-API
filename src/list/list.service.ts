import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { List } from "./schema/list.schema";
import { Model } from "mongoose";
import { BoardFindDto } from "../broad/Dto/broad.Dto";

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private listModel: Model<List>
  ) {
  }

  async createList(list): Promise<any> {
    return this.listModel.create(list);
  }

  async findListById(id: string): Promise<any> {
    return this.listModel.findOne({ _id: id }).populate("cards");
  }

  async updateIndexBroad(lists): Promise<any> {
    return await lists.forEach((item, index) => {
      this.listModel.updateOne({ _id: item._id }, { $set: { index_broad: +index + 1 } });
    });
  }

  async updateList(id: string, list): Promise<any> {
    return this.listModel.updateOne({ _id: id }, { $set: list });
  }

  async deleteList(id: string): Promise<any> {
    return await this.listModel.deleteOne({ _id: id }).exec();
  }

  async deleteListsByBoard(boardFind: BoardFindDto): Promise<any> {
    const listIds = boardFind.lists.map((list) => list._id);
    return this.listModel.deleteMany({ _id: { $in: listIds } });
  }
}