import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Broad } from "./schema/broad.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBroadDto, UpdateBroadDto } from "./Dto/broad.Dto";
import { FindUserDto } from "../auth/Dto/user.Dto";

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
    let broadsFind = await this.BroadModel.find({ users: broad.users });
    await broadsFind.forEach((item) => {
      if (item.title === broad.title) {
        throw new UnauthorizedException("Broad already exists");
      }
    });
    return this.BroadModel.updateOne({ _id: id }, { $set: broad });
  }

  async deleteBroadById(idBroad: string): Promise<any> {
    await this.BroadModel.deleteOne({ _id: idBroad });
  }

  async findBroadById(idBroad: string): Promise<any> {
    return this.BroadModel.findOne({ _id: idBroad });
  }

}