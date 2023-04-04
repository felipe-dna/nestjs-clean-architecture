import { AuthHelper } from "@/core/utils/auth"
import { AuthController } from "@controllers/auth/auth.controller"
import { UsersDatabaseRepository } from "@data/database/users/user-database.repository"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { UserRepository } from "@repositories/users/user.repository"
import { SignupService } from "@services/auth/signup.service"
import { AtStrategy, RtStrategy } from "@services/auth/strategies"
import { ApiConfigService } from "@services/config/api-config.service"

@Module({
	imports: [
		JwtModule.register({})
	],
	controllers: [AuthController],
	providers: [
		ApiConfigService,
		{
			provide: AuthHelper,
			useClass: AuthHelper
		},

		/**
		 * Repositories.
		*/
		{
			provide: UserRepository,
			useClass: UsersDatabaseRepository,
		},
		SignupService,
		AtStrategy,
		RtStrategy
	]
})
export class AuthModule {}
