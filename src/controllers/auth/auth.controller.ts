import { SignupBodyDto } from "@dtos/auth/auth.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { SignupService } from "@services/auth/signup.service";

@Controller({
	path: '/auth',
	version: '1'
})
export class AuthController {
	constructor (private signupService: SignupService) {}

	@Post('/signup')
	async signup(@Body() body: SignupBodyDto) {
		return await this.signupService.execute(body)
	}

	@Post('/signin')
	async signin() {}

	@Post('/logout')
	async logout() {}

	@Post('/refresh')
	async refreshTokens() {}
}
