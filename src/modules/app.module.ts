import { Module } from '@nestjs/common'
import { UsersControllers } from '@controllers/users/users.controller'
import { CreateUserUsecase } from '@usecases/users/create-user.usecase'
import { UserRepository } from '@repositories/users/user.repository'
import { UsersInMemoryRepository } from '@data/in-memory/users-in-memory.repository'
import { ConfigModule } from '@nestjs/config'

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
  controllers: [UsersControllers],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    },
    CreateUserUsecase,
  ],
})
export class AppModule {}
