import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { List, ListSchema } from "./schema/list.schema";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { Broad, BroadSchema } from "../broad/schema/broad.schema";
import { BroadService } from "src/broad/broad.service";

@Module({
  imports: [MongooseModule.forFeature([{
    name: List.name,
    schema: ListSchema
  }]), MongooseModule.forFeature([{ name: Broad.name, schema: BroadSchema }])],
  controllers: [ListController],
  providers: [ListService, BroadService]
})
export class ListModule {

}