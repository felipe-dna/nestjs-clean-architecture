import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiConfigService } from "@services/config/api-config.service";
import * as bcrypt from 'bcrypt'

export type Tokens = {
	accessToken: string
	refreshToken: string
}

@Injectable()
export class AuthHelper {
	constructor (private config: ApiConfigService, private jwtService: JwtService) {}

	private async getToken(userId: string, email: string, expiresIn: number, secret: string) {
		return await this.jwtService.signAsync(
			{
				sub: userId,
				email
			},
			{
				expiresIn,
				secret
			}
		)
	}

	async generateTokens(userId: string, email: string): Promise<Tokens> {
		const appConfig = this.config.appConfig

		const [accessToken, refreshToken] = await Promise.all([
			this.getToken(userId, email,  60 * 15, appConfig.accessTokenSecret),
			this.getToken(userId, email,  60 * 60 * 24 * 7, appConfig.refreshTokenSecret),
		])

		return {
			accessToken,
			refreshToken
		}
	}

	async hashData(data: string): Promise<string> {
		return await bcrypt.hash(data, 10)
	}
}


