import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

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
    console.log(token);
    try {
      console.log(this.jwtService.verify(token),1);
      request.user = await this.jwtService.verify(token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}