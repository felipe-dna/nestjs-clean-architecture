import { Injectable } from '@nestjs/common'
import { UseCase } from '../../core/base/use-case'
import { UserCreateDto } from '../../shared/dtos/user-create.dto'
import { UserCreateMapper } from '../../core/domain/mappers/users/user-create.mapper'
import { UserRepository } from '../../core/repositories/users/user.repository'
import { UserCreatedMapper } from '../../core/domain/mappers/users/user-created.mapper'
import { map, Observable } from 'rxjs'
import { UserCreatedDto } from '../../shared/dtos/user-created.dto'

@Injectable()
export class CreateUserUsecase implements UseCase<UserCreatedDto> {
	private userCreateMapper: UserCreateMapper
	private userCreatedMapper: UserCreatedMapper

	constructor(private readonly repository: UserRepository) {
		this.userCreatedMapper = new UserCreatedMapper()
		this.userCreateMapper = new UserCreateMapper()
	}

	execute(user: UserCreateDto): Observable<UserCreatedDto> {
		const entity = this.userCreateMapper.mapFrom(user)
		return this.repository.create(entity).pipe(map(this.userCreatedMapper.mapTo))
	}
}
