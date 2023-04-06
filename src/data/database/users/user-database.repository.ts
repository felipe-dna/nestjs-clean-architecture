import { Injectable } from '@nestjs/common'
import { DatabaseRepository } from '@/data/database'
import { UserEntity } from '@entities/users'
import { UserRepository } from '@repositories/users/user.repository'
import { Observable, of } from 'rxjs'
import { PrismaService } from '@services/prisma/prisma.service'

@Injectable()
export class UsersDatabaseRepository extends DatabaseRepository<UserEntity> implements UserRepository {
	constructor(private client: PrismaService) {
		super(client)
	}

	async create(data: UserEntity): Promise<Observable<UserEntity>> {
		return of(
			await this.client.user.create({
				data,
			}),
		)
	}

	async getById(id: string): Promise<UserEntity> {
		return await this.client.user.findUnique({ where: { id } })
	}

	async getMany(filter: Partial<UserEntity>): Promise<Observable<UserEntity[]>> {
		throw new Error('not implemented')
	}

	async delete(id: string): Promise<Observable<void>> {
		throw new Error('not implemented')
	}

	async getOne(filter: Partial<UserEntity>): Promise<Observable<UserEntity>> {
		const foundUser = await this.client.user.findFirst({ where: filter })
		return of(foundUser)
	}

	async getAll(): Promise<Observable<UserEntity[]>> {
		throw new Error('not implemented')
	}

	async update(id: string, data: UserEntity): Promise<Observable<UserEntity>> {
		throw new Error('not implemented')
	}

	async patch(id: string, data: Partial<UserEntity>): Promise<Observable<UserEntity>> {
		const updatedUser = await this.client.user.update({
			where: {
				id,
			},
			data,
		})

		return of(updatedUser)
	}
}
