import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { List } from "./schema/list.schema";
import { Model } from "mongoose";
import { CreateListDto } from "./Dto/list.Dto";

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name)
    private ListModel: Model<List>
  ) {
  }

  async createList(list): Promise<any> {
    let listFind = await this.ListModel.find({ broad: list.broad });
    await listFind.forEach((item) => {
      if (item.title === list.title) {
        throw new UnauthorizedException("Title already exists");
      }
    });
    list.index_broad = listFind.length + 1;

    return this.ListModel.create(list);
  }

  async getOneList(id: string): Promise<any> {
    return this.ListModel.findById(id).populate("broad");
  }

  async updateIndexBroad(lists): Promise<any> {
    return await lists.forEach((item, index) => {
      this.ListModel.updateOne({ _id: item._id }, { $set: { index_broad: +index + 1 } });
    });
  }

  async updateList(id: string, list): Promise<any> {
    let listFind = await this.ListModel.find({ broad: list.broad });
    await listFind.forEach((item) => {
      if (item.title === list.title) {
        throw new UnauthorizedException("List already exists");
      }
    });
    return this.ListModel.updateOne({ _id: id }, { $set: list });
  }

  async deleteList(id: string): Promise<any> {
    return await this.ListModel.deleteOne({ _id: id }).exec();
  }

  async;
}