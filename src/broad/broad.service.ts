import { Injectable } from "@nestjs/common";
import { Broad } from "./schema/broad.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBroadDto } from "./Dto/broad.Dto";

@Injectable()
export class BroadService {
  constructor(
    @InjectModel(Broad.name)
    private BroadModel: Model<Broad>
  ) {
  }

  async createBroad(broad: CreateBroadDto): Promise<Broad> {
    return await this.BroadModel.create(broad);
  }

  async updateBroad(id: string, broad): Promise<any> {
    await this.BroadModel.updateOne({ _id: id }, { $set: broad });
  }

  async deleteBroadById(idBroad: string): Promise<any> {
    await this.BroadModel.deleteOne({ _id: idBroad });
  }

  async findBroadById(idBroad: string): Promise<any> {
    return this.BroadModel.findOne({ _id: idBroad }).populate({
      path: "lists",
      populate: {
        path: "cards",
        model: "Card"
      }
    });
  }

  async findAllBroadByUser(user: string): Promise<any> {
    return this.BroadModel.find({ users: user });
  }
}