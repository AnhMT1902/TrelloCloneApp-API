import { Types, Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { List } from "../../list/schema/list.schema";


@Schema()
export class Broad extends Document {
  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  users: Types.ObjectId | User;

  @Prop({ type: [{ type: Types.ObjectId, ref: "List" }] })
  lists: Types.ObjectId | List[];
}

export const BroadSchema = SchemaFactory.createForClass(Broad);