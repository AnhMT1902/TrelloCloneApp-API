import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ListModule } from "./list/list.module";
import { BroadModule } from "./broad/broad.module";
import { CardModule } from "./card/card.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/trello-app")
    , AuthModule, BroadModule, ListModule, CardModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
