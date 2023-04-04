import { Observable } from 'rxjs'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserUsecase } from '@usecases/users/create-user.usecase'
import { UserCreateDto } from '@dtos/user-create.dto'
import { UserCreatedDto } from '@dtos/user-created.dto'

@Controller({
	path: '/users',
	version: '1',
})
export class UserServiceV1 {
	constructor(private createUserUseCase: CreateUserUsecase) {}

	@Post()
	public create(@Body() user: UserCreateDto): Observable<UserCreatedDto> {
		return this.createUserUseCase.execute(user)
	}
}
