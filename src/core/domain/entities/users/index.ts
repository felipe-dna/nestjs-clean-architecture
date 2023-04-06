import { Entity } from '@base/entity'
export class UserEntity extends Entity {
	public firstName: string
	public lastName: string
	public passwordHash: string
	public email: string
	public hashedRT?: string
}
