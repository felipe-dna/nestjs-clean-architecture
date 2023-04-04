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

  public create(data: TEntity): Observable<TEntity> {
    data.id = randomUUID()
    const count = this.items.push(data)
    console.log(this.items)
    return of(this.items[count - 1])
  }

  public update(id: string, data: TEntity): Observable<TEntity> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: raise an error
      return
    }

    this.items[index] = data
    return of(this.items[index])
  }

  public patch(id: string, data: Partial<TEntity>): Observable<TEntity> {
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

  public getById(id: string): Observable<TEntity> {
    const items = this.items.find(item => item.id === id)

    return of(items)
  }

  public getAll(): Observable<TEntity[]> {
    return of(this.items)
  }

  public getOne(filter: Partial<TEntity>): Observable<TEntity> {
    return this.getMany(filter).pipe(map(items => (items.length > 0 ? items[0] : null)))
  }

  public getMany(filter: Partial<TEntity>): Observable<TEntity[]> {
    let filtered = this.items

    for (const key in filter) {
      filtered = filtered.filter(item => item[key] === filter[key])
    }

    return of(filtered)
  }

  public delete(id: string): Observable<void> {
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
