import { Observable } from 'rxjs'
import { Entity } from './entity'

export abstract class Repository<TEntity extends Entity> {
	abstract create(data: TEntity): Promise<Observable<TEntity>>
	abstract update(id: string, data: TEntity): Promise<Observable<TEntity>>
	abstract patch(id: string, data: Partial<TEntity>): Promise<Observable<TEntity>>
	abstract getById(id: string): Promise<Observable<TEntity>>
	abstract getAll(): Promise<Observable<TEntity[]>>
	abstract getOne(filter: Partial<TEntity>): Promise<Observable<TEntity>>
	abstract getMany(filter: Partial<TEntity>): Promise<Observable<TEntity[]>>
	abstract delete(id: string): Promise<Observable<void>>
}
