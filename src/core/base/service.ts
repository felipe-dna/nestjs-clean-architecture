import { Observable } from 'rxjs'

export interface Service<TModel> {
	execute(...args: any[]): Promise<Observable<TModel>> | Promise<TModel>
}
