import { AuthController } from "@controllers/auth/auth.controller"
import { UsersDatabaseRepository } from "@data/database/users/user-database.repository"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { UserRepository } from "@repositories/users/user.repository"
import { SignupService } from "@services/auth/signup.service"
import { AtStrategy, RtStrategy } from "@services/auth/strategies"

@Module({
	imports: [
		JwtModule.register({})
	],
	controllers: [AuthController],
	providers: [
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
