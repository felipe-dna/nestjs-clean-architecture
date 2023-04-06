import { concatMap, map } from 'rxjs'
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Service } from '@base/service'
import { SignupBodyDto } from '@dtos/auth/auth.dto'
import { UserRepository } from '@repositories/users/user.repository'
import { UserEntity } from '@entities/users'
import { AuthHelper, Tokens } from '@/core/utils/auth'

type SignupResponse = Omit<UserEntity, 'passwordHash' | 'hashedRT'> & Tokens

@Injectable()
export class SignupService implements Service<any> {
	constructor(private repository: UserRepository, private authHelper: AuthHelper) {}

	private async validateEmailExistence(email: string): Promise<void> {
		const emailExists = await this.repository.getOne({ email })

		emailExists.subscribe(user => {
			if (user) {
				throw new BadRequestException('An user with this email already exists.')
			}
		})
	}

	private async updateHash(userId: string, refreshToken: string) {
		const hash = await this.authHelper.hashData(refreshToken)
		await this.repository.patch(userId, { hashedRT: hash })
	}

	private async mapResponse(userData: Promise<UserEntity & Tokens>): Promise<SignupResponse> {
		const { id, firstName, lastName, refreshToken, accessToken, email } = await userData

		return {
			id,
			firstName,
			lastName,
			email,
			accessToken,
			refreshToken,
		}
	}

	async execute({ email, firstName, lastName, password }: SignupBodyDto) {
		const emailExists = await this.repository.getOne({ email })

		emailExists.subscribe(user => {
			if (user) throw new BadRequestException('An user with this email already exists.')
		})

		const newUser = await this.repository.create({
			email,
			firstName,
			lastName,
			passwordHash: await this.authHelper.hashData(password),
		})

		return await newUser.pipe(
			/**
			 * Generates the tokens.
			 */
			map(async ({ id, email, ...user }) => {
				const tokens = await this.authHelper.generateTokens(id, email)

				return {
					id,
					email,
					...user,
					...tokens,
				}
			}),

			/**
			 * Updates the given hash in the database.
			 */
			map(async userData => {
				const user = await userData
				await this.updateHash(user.id, user.email)
				return user
			}),

			/**
			 * Returns the mapped response.
			 */
			map(this.mapResponse),
		)
	}
}
