import { Observable, concatMap } from 'rxjs'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Service } from '@base/service'
import { AuthHelper, Tokens } from '@/core/utils/auth'
import { UserRepository } from '@repositories/users/user.repository'

@Injectable()
export class RefreshTokenService implements Service<Tokens> {
	constructor(private repository: UserRepository, private authHelper: AuthHelper) {}

	async execute(userId: string, refreshToken: string): Promise<Tokens> {
		const user = await this.repository.getById(userId)

		if (!user || !user.hashedRT) throw new ForbiddenException('Access Denied.')

		const refreshTokenMatches = await this.authHelper.comparePasswords(refreshToken, user.hashedRT)

		if (!refreshTokenMatches) throw new ForbiddenException('Access Denied.')

		const tokens = await this.authHelper.generateTokens(user.id, user.email)
		const newRefreshTokenHash = await this.authHelper.hashData(tokens.refreshToken)

		await this.repository.patch(user.id, { hashedRT: newRefreshTokenHash })

		return tokens
	}
}
