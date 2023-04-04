import { Body, Controller, HttpCode, HttpStatus, Post,  UseGuards } from "@nestjs/common"
import { SignupBodyDto } from "@dtos/auth/auth.dto"
import { SiginBodyDto } from "@dtos/auth/signin.dto"
import { LogoutService } from "@services/auth/logout.service"
import { SigninUserService } from "@services/auth/signin.service"
import { SignupService } from "@services/auth/signup.service"
import {  RefreshTokenGuard } from "@guards"
import { GetCurrentUserId, GetUserParam, Public } from "@decorators"

@Controller({
	path: 'auth',
	version: '1'
})
export class AuthController {
	constructor (
		private signupService: SignupService,
		private siginService: SigninUserService,
		private logoutService: LogoutService
	) {}

	@Public()
	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() body: SignupBodyDto) {
		return await this.signupService.execute(body)
	}

	@Public()
	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async signin(@Body() body: SiginBodyDto) {
		return await this.siginService.execute(body)
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@GetCurrentUserId() userId: string) {
		return await this.logoutService.execute(userId)
	}

	@UseGuards(RefreshTokenGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@GetCurrentUserId() userId: string,
		@GetUserParam('refreshToken') refreshToken: string
	) {}
}
