import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Broad, BroadSchema } from "./schema/broad.schema";
import { BroadController } from "./broad.controller";
import { BroadService } from "./broad.service";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { User, UserSchema } from "../auth/schema/user.schema";
import { CardService } from "../card/card.service";
import { ListService } from "../list/list.service";
import { List, ListSchema } from "../list/schema/list.schema";
import { Card, CardSchema } from "../card/schema/card.schema";

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{
      name: Broad.name, schema: BroadSchema
    }]), MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]), MongooseModule.forFeature([{
      name: List.name,
      schema: ListSchema
    }]), MongooseModule.forFeature([{
      name: Card.name,
      schema: CardSchema
    }]), MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  controllers: [BroadController],
  providers: [BroadService, JwtAuthGuard, JwtService, AuthService, CardService, ListService, AuthService]
})
export class BroadModule {
}