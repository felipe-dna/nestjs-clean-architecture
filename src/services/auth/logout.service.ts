import { Service } from "@base/service"
import { Injectable } from "@nestjs/common"
import { UserRepository } from "@repositories/users/user.repository"
import { Observable, of } from "rxjs"

@Injectable()
export class LogoutService implements Service<void> {
	constructor (private repository: UserRepository) {}

	async execute(userId: string): Promise<Observable<void>> {
		await this.repository.patch(userId, { hashedRT: null })
		return of(null)
	}
}
