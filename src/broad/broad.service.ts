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

  async addMember(idBroad: string, emailMember): Promise<Broad> {
    let memberFind
    return;
  }
}