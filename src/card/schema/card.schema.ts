import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CardDocument =  HydratedDocument<Card>
@Schema()
export class Card {
  @Prop()
  detail: String
}
export const CardSchema = SchemaFactory.createForClass(Card)