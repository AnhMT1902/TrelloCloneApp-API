import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { Card, CardSchema } from "./schema/card.schema";
import { ListService } from "../list/list.service";
import { BroadService } from "../broad/broad.service";
import { List, ListSchema } from "../list/schema/list.schema";
import { Broad, BroadSchema } from "../broad/schema/broad.schema";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Card.name,
      schema: CardSchema
    }]),
    MongooseModule.forFeature([{
      name: List.name,
      schema: ListSchema
    }]),
    MongooseModule.forFeature([{
      name: Broad.name,
      schema: BroadSchema
    }])],
  controllers: [CardController],
  providers: [CardService, JwtAuthGuard, ListService, BroadService]
})
export class CardModule {
}