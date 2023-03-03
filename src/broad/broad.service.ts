import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Broad } from "./schema/broad.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBroadDto, UpdateBroadDto } from "./Dto/broad.Dto";

@Injectable()
export class BroadService {
  constructor(
    @InjectModel(Broad.name)
    private BroadModel: Model<Broad>
  ) {
  }

  async createBroad(broad: CreateBroadDto): Promise<Broad> {
    let broadFind = await this.BroadModel.findOne({ title: broad.title, users: broad.users });
    if (!broadFind) {
      return await this.BroadModel.create(broad);
    } else {
      throw new UnauthorizedException("Broad already exists");
    }
  }

  async updateBroad(id: string, broad: UpdateBroadDto): Promise<any> {
    return this.BroadModel.updateOne({ _id: id }, { $set: broad });
  }

  async deleteBroadById(idBroad: string): Promise<any> {
    await this.BroadModel.deleteOne({ _id: idBroad });
  }

  async findBroadById(idBroad: string): Promise<any> {
    return this.BroadModel.find().populate({path: "lists"});
  }

//em bỏ populate đi thì nó ra một mảng list\
  // thêm rồi nhé
}