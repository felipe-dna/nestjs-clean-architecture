import { Repository } from '../../base/repository'
import { UserEntity } from '../../domain/entities/users'

export abstract class UserRepository extends Repository<UserEntity> {}
