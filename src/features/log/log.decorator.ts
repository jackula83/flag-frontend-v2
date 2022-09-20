import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AddLogRequest = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.addLogRequest
  }
)