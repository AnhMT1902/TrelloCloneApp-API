import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Broad, BroadSchema } from "./schema/broad.schema";
import { BroadController } from "./broad.controller";
import { BroadService } from "./broad.service";

@Module({
  imports: [MongooseModule.forFeature([{name: Broad.name, schema: BroadSchema}])],
  controllers: [BroadController],
  providers: [BroadService]
})
export class BroadModule {

}