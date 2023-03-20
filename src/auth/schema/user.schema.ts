import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Broad } from "../../broad/schema/broad.schema";


@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "List" }] })
  broads: Types.ObjectId | Broad[];
}

export const UserSchema = SchemaFactory.createForClass(User);