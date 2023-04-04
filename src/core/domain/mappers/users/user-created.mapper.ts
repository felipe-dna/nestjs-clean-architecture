import { Mapper } from '../../../base/mapper'
import { UserCreatedDto } from '../../../../shared/dtos/user-created.dto'
import { UserEntity } from '../../entities/users'

export class UserCreatedMapper implements Mapper<UserCreatedDto, UserEntity> {
	public mapFrom(data: UserCreatedDto): UserEntity {
		const user = new UserEntity()
		user.id = data.id
		user.name = data.name

		return user
	}

	public mapTo(data: UserEntity): UserCreatedDto {
		const user = new UserCreatedDto()

		user.id = data.id
		user.name = data.name

		return user
	}
}
