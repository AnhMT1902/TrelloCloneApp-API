import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { ExecutionContext } from "@nestjs/common";
import { jwtConstants } from "../constants";
import { using } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      return false;
    }
    const token = bearerToken.split(" ")[1];
    try {
      request.user = await this.jwtService.verify(token, jwtConstants);
      return true;
    } catch (err) {
      return false;
    }
  }
}


