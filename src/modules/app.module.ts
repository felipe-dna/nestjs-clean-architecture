import { Module } from '@nestjs/common'
import { UserService } from '@services/users/users.service'
import { CreateUserUsecase } from '@usecases/users/create-user.usecase'
import { UserRepository } from '@repositories/users/user.repository'
import { UsersInMemoryRepository } from '@data/in-memory/users-in-memory.repository'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigService } from '@services/api-config.service'

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
  controllers: [UserService],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    },
    CreateUserUsecase,
		ApiConfigService
  ],
})
export class AppModule {}
