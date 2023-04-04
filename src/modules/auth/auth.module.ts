import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthHelper } from '@/core/utils/auth'
import { AuthController } from '@controllers/auth/auth.controller'
import { UsersDatabaseRepository } from '@data/database/users/user-database.repository'
import { UserRepository } from '@repositories/users/user.repository'
import { LogoutService } from '@services/auth/logout.service'
import { RefreshTokenService } from '@services/auth/refresh-token.service'
import { SigninUserService } from '@services/auth/signin.service'
import { SignupService } from '@services/auth/signup.service'
import { AtStrategy, RtStrategy } from '@services/auth/strategies'
import { ApiConfigService } from '@services/config/api-config.service'

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		/**
		 * Configuration.
		 */
		ApiConfigService,

		/**
		 * Auth Helper.
		 */
		{
			provide: AuthHelper,
			useClass: AuthHelper,
		},

		/**
		 * Repositories.
		 */
		{
			provide: UserRepository,
			useClass: UsersDatabaseRepository,
		},

		/**
		 * Services.
		 */
		SignupService,
		SigninUserService,
		LogoutService,
		RefreshTokenService,

		/**
		 * JWT strategies.
		 */
		AtStrategy,
		RtStrategy,
	],
})
export class AuthModule {}
