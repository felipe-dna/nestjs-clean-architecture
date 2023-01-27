import { Mapper } from '../../../base/mapper'
import { UserCreateDto } from '../../../../shared/dtos/user-create.dto'
import { UserEntity } from '../../entities/users'

export class UserCreateMapper extends Mapper<UserCreateDto, UserEntity> {
  mapFrom(data: UserCreateDto): UserEntity {
    const user = new UserEntity()
    user.name = data.name
    user.email = data.email
    user.password = data.password

    return user
  }

  mapTo(data: UserEntity): UserCreateDto {
    const user = new UserCreateDto()
    user.id = data.id
    user.name = data.name
    user.email = data.email
    user.password = data.password

    return user
  }
}
