import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserUsecase } from '../../usecases/users/create-user.usecase'
import { UserCreateDto } from '../../shared/dtos/user-create.dto'
import { Observable } from 'rxjs'
import { UserCreatedDto } from '../../shared/dtos/user-created.dto'

@Controller('/users')
export class UserService {
  constructor(private createUserUseCase: CreateUserUsecase) {}

  @Post()
  public create(@Body() user: UserCreateDto): Observable<UserCreatedDto> {
    return this.createUserUseCase.execute(user)
  }
}
