import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Service } from "@base/service"
import { SignupBodyDto } from "@dtos/auth/auth.dto"
import { UserRepository } from "@repositories/users/user.repository"
import { JwtService } from "@nestjs/jwt"
import { map } from "rxjs"
import * as bcrypt from 'bcrypt'

@Injectable()
export class SignupService implements Service<any> {
	constructor(private repository: UserRepository, private jwtService: JwtService) {}

	private async validateEmailExistence(email: string): Promise<void> {
		const emailExists = await this.repository.getOne({ email })

		emailExists.subscribe(user => {
			if (user) {
				throw new HttpException('An user with this email already exists.', HttpStatus.BAD_REQUEST)
			}
		})
	}

	private async getTokens(userId: string, email: string): Promise<{ access_token: string; refresh_token: string }> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync({
				sub: userId,
				email
			}, {
				expiresIn: 60 * 15,
				secret: 'at-secret'
			}),
			this.jwtService.signAsync({
				sub: userId,
				email
			}, {
				expiresIn: 60 * 60 * 24 * 7,
				secret: 'rt-secret'
			})
		]);

		return {
			access_token: at,
			refresh_token: rt
		}
	}

	private async hashData(data: string): Promise<string> {
		return await bcrypt.hash(data, 10)
	}

	private async updateHash(userId: string, refreshToken: string) {
		const hash = await this.hashData(refreshToken)
		await this.repository.patch(
			userId,
			{ hashedRT: hash }
		)
	}

	async execute({ email, firstName, lastName, password }: SignupBodyDto) {
    await this.validateEmailExistence(email)

		const newUser = await this.repository.create({
			email,
			firstName,
			lastName,
			passwordHash: await this.hashData(password)
		})

		return await newUser.pipe(
			map(async ({id, email, ...user}) => ({
				id,
				email,
				...user,
				...(await this.getTokens(id, email))
			})),
			map(async (userData) => {
				const user = await userData
				await this.updateHash(user.id, user.refresh_token)
				return user
			}),
			map(async (userData) => {
				const { id, firstName, lastName, email, access_token, refresh_token } = await userData
				return {id, firstName, lastName, email, access_token, refresh_token }
			})
		)
	}
}
