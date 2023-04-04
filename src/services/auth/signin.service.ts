import { AuthHelper, Tokens } from "@/core/utils/auth"
import { Service } from "@base/service"
import { SiginBodyDto } from "@dtos/auth/signin.dto"
import { ForbiddenException, Injectable } from "@nestjs/common"
import { UserRepository } from "@repositories/users/user.repository"
import { Observable, concatMap } from "rxjs"

@Injectable()
export class SigninUserService implements Service<Tokens> {
	constructor (private repository: UserRepository, private authHelper: AuthHelper) {}

	async execute(body: SiginBodyDto): Promise<Observable<Tokens>> {
		const user = await this.repository.getOne({ email: body.email })
		return user.pipe(
			/**
			 * Checks if the user exists by the given email.
			 */
			concatMap(async user => {
				if (!user) throw new ForbiddenException('Invalid Credentials')
				return user
			}),

			/**
			 * Validate the given password
			 */
			concatMap(async (user) => {
				const passwordMatches = await this.authHelper.comparePasswords(body.password, user.passwordHash)

				if (!passwordMatches) throw new ForbiddenException('Invalid Credentials')

				return user
			}),

			/*
			*
			 * Generates a new Hash.
			 */
			concatMap(async user => {
				const tokens = await this.authHelper.generateTokens(user.id, user.email)
				const newRefreshTokenHash = await this.authHelper.hashData(tokens.refreshToken)

				await this.repository.patch(
					user.id,
					{ hashedRT: newRefreshTokenHash }
				)

				return tokens
			})
		)
	}
}
