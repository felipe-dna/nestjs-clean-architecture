import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserParam = createParamDecorator((paramName: string, context: ExecutionContext): string => {
	const request = context.switchToHttp().getRequest()
	return request.user[paramName]
})
