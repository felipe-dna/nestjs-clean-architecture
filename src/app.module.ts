import { Module } from '@nestjs/common'
import { UsersControllers } from './services/users/users.service'
import { CreateUserUsecase } from './usecases/users/create-user.usecase'
import { UserRepository } from './core/repositories/users/user.repository'
import { UsersInMemoryRepository } from './data/in-memory/users-in-memory.repository'

@Module({
  imports: [],
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
