import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserRepository } from '@repositories/users/user.repository'
import { UsersInMemoryRepository } from '@data/in-memory/users-in-memory.repository'
import { CreateUserUsecase } from '@usecases/users/create-user.usecase'
import { UserServiceV1 } from '@services/users/users.service'
import { ApiConfigService } from '@services/config/api-config.service'
import { PrismaService } from '@services/prisma/prisma.service'

@Module({
	imports: [
		/**
		 * Config Module:
		 * https://docs.nestjs.com/techniques/configuration
		 */
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [UserServiceV1],
	providers: [
		/**
		 * Repositories.
		 */
		{
			provide: UserRepository,
			useClass: UsersInMemoryRepository,
		},

		/**
		 * Use cases.
		 */
		CreateUserUsecase,

		/**
		 * Provides the application configuration.
		 */
		ApiConfigService,

		/**
		 * Provides access to the database connection instance.
		 */
		PrismaService
	],
})
export class AppModule {}
