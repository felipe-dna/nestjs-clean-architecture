import { Injectable } from '@nestjs/common'
import { InMemoryRepository } from './index'
import { UserEntity } from '../../core/domain/entities/users'
import { UserRepository } from '../../core/repositories/users/user.repository'

@Injectable()
export class UsersInMemoryRepository extends InMemoryRepository<UserEntity> implements UserRepository {}
