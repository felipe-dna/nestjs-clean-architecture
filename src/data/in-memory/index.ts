import { Injectable } from '@nestjs/common'
import { Repository } from '../../core/base/repository'
import { Entity } from '../../core/base/entity'
import { map, Observable, of } from 'rxjs'
import { randomUUID } from 'crypto'

@Injectable()
export class InMemoryRepository<TEntity extends Entity> extends Repository<TEntity> {
	protected readonly items: TEntity[]

	constructor() {
		super()
		this.items = []
	}

	public async create(data: TEntity): Promise<Observable<TEntity>> {
		data.id = randomUUID()
		const count = this.items.push(data)
		console.log(this.items)
		return of(this.items[count - 1])
	}

	public async update(id: string, data: TEntity): Promise<Observable<TEntity>> {
		const index = this.getIndexById(id)

		if (index === -1) {
			// TODO: raise an error
			return
		}

		this.items[index] = data
		return of(this.items[index])
	}

	public async patch(id: string, data: Partial<TEntity>): Promise<Observable<TEntity>> {
		const index = this.getIndexById(id)

		if (index === -1) {
			// TODO: raise an error
			return
		}

		for (const key in data) {
			this.items[index][key] = data[key]
		}

		return of(this.items[index])
	}

	public async getById(id: string): Promise<TEntity> {
		return this.items.find(item => item.id === id)
	}

	public async getAll(): Promise<Observable<TEntity[]>> {
		return of(this.items)
	}

	public async getOne(filter: Partial<TEntity>): Promise<Observable<TEntity>> {
		return (await this.getMany(filter)).pipe(map(items => (items.length > 0 ? items[0] : null)))
	}

	public async getMany(filter: Partial<TEntity>): Promise<Observable<TEntity[]>> {
		let filtered = this.items

		for (const key in filter) {
			filtered = filtered.filter(item => item[key] === filter[key])
		}

		return of(filtered)
	}

	public async delete(id: string): Promise<Observable<void>> {
		const index = this.getIndexById(id)

		if (index === -1) {
			// todo: trate o caso de não encontrar o item a ser deletado
		}

		this.items.filter(item => item.id !== id)
		return of()
	}

	private getIndexById(id: string) {
		return this.items.findIndex(item => item.id === id)
	}
}
